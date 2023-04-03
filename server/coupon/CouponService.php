<?php
include_once __DIR__ . '/CouponRepository.php';
include_once dirname(__DIR__) . '/matches/MatchesRepository.php';

class CouponService {

    public function getCouponsWithResults() {
        $couponRepo = new CouponRepository();
        $matchesRepo = new MatchesRepository();
        $coupons = $couponRepo->getAll();  
        $matches = $matchesRepo->getLatest();

        foreach($coupons as $coupon_index => $coupon) {
            $predictions = json_decode($coupon['predictions']);

            $amountCorrect = 0;

            foreach($predictions as $prediction_index => $prediction) {
                $match = array_values(array_filter(json_decode($matches['data']), fn($match) => $match->id === $prediction->id));

                if(empty($match)) {
                    continue;
                }
                $match = $match[0];
                
                $homeTeamScore = $match->participants[0]->finalResult;
                $awayTeamScore = $match->participants[1]->finalResult;

                $tipResult = "";
                if($homeTeamScore > $awayTeamScore) {
                    $tipResult = "1";
                } else if($homeTeamScore < $awayTeamScore) {
                    $tipResult = "2";
                } else if($homeTeamScore === $awayTeamScore){
                    $tipResult = "x";
                }

                if($prediction->prediction === $tipResult && $match->state === "FINISHED") {
                    $prediction->won = true;
                    $amountCorrect++;            
                } else {
                    $prediction->won = false;
                }
                $predictions[$prediction_index] = $prediction;

            }
            $coupons[$coupon_index]['predictions'] = $predictions;
            $coupons[$coupon_index]['amountCorrect'] = $amountCorrect;
        }

        return $coupons;
    }

    public function getSortedByAmountCorrect() {
        $couponsWithResult = $this->getCouponsWithResults();

        usort($couponsWithResult, function($a, $b) {
            if ($a['amountCorrect'] > $b['amountCorrect']) {
                return -1;
            } elseif ($a['amountCorrect'] < $b['amountCorrect']) {
                return 1;
            }
            return 0;
        });

        return $couponsWithResult;
    }

    function sendEmail($to) {
        $subject = 'Stilling';
        $from_email = 'info@jcrl.dk';
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = 'info@jcrl.dk';
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';
        
        $topThree = $this->getSortedByAmountCorrect();
        echo json_encode($topThree);
        $message = '';
        
        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));
        
        $headers_string = implode("\r\n", $headers);
      
        if (mail($to, $subject, $message, $headers_string)) {
          echo 'Email sent successfully';
        } else {
          echo 'Email not sent';
        }
      }
      
}