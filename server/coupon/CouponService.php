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
}