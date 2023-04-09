<?php
include_once __DIR__ . '/CouponRepository.php';
include_once dirname(__DIR__) . '/matches/MatchesRepository.php';

class CouponService {

    public function getCouponsWithResults() {
        $couponRepo = new CouponRepository();
        $matchesRepo = new MatchesRepository();
        $coupons = $couponRepo->getAccepted();  
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

    private function getSortedMatchesByStartDate() {
        $matchesRepo = new MatchesRepository();
        $matches = json_decode($matchesRepo->getLatest()['data']);

        usort($matches, function($a, $b) {
            if ($a->startDate > $b->startDate) {
                return 1;
            } elseif ($a->startDate < $b->startDate) {
                return -1;
            }
            return 0;
        });

        return $matches;
    }

    public function sendStandingsEmail($to_email, $to_name) {
        $subject = 'Stilling - EM 2024 Tips';
        $from_email = 'tips-manager@jcrl.dk';
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = 'tips-manager@jcrl.dk';
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';
        
        $table = $this->generateStandingsTable();
        
        $message = sprintf("<h2>Hej %s</h2>\n\n
        <p>Her er nuværende stilling for EM 2024 tipskonkurrencen.</p>\n\n
        <p>Du kan også se stillingen <a href='%s'>her</a>.</p> 
        %s", 
        $to_name,
        'https://jcrl.dk', 
        $table);
        
        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));
        
        $headers_string = implode("\r\n", $headers);
      
        if (mail($to_email, $subject, $message, $headers_string)) {
          echo 'Email sent successfully';
        } else {
          echo 'Email not sent';
        }
      }
      
    private function generateStandingsTable() {
        $matches = $this->getSortedMatchesByStartDate();
        $sortedStandings = $this->getSortedByAmountCorrect();

        echo '
        <style>
            table {
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 14px;
                font-family: Arial, sans-serif;
            }
            
            th,
            td {
                padding: 8px 8px;
                border: 1px solid #ddd;
                text-align: center;
            }
            
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            
            td div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }
            
            td span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        </style>
        ';

        $table = '
        <table>
            <thead>
                <tr>
                    <th></th>';
                        
        foreach($sortedStandings as $sortedStanding) {
            $table .= '
                <th>
                    <div>
                        <span>'. $sortedStanding['name'] .'</span>
                        <span>'. $sortedStanding['amountCorrect'] .' ✔</span>
                    </div>
                </th>';
        }
        $table .= '
                </tr>
            </thead>
            <tbody>';
        foreach($matches as $match) {
            $table .= '
                <tr>
                    <td>
                        <div>
                            <span>'. $match->participants[0]->name . ' - ' . $match->participants[1]->name .'</span>
                            <span>'. ($match->state === "FINISHED" ? $match->participants[0]->finalResult . " - " . $match->participants[1]->finalResult : "") .'</span>
                        </div>
                    </td>';
        foreach($sortedStandings as $sortedStanding) {
            foreach($sortedStanding['predictions'] as $prediction) {
                if($prediction->id === $match->id) {
                    $table .= '
                    <td style="' . ($prediction->won && $match->state === "FINISHED" ? 'background-color:#098b54' : (!$prediction->won && $match->state === "FINISHED" ? 'background-color:red' : '')) .'">
                        ' . $prediction->prediction .'
                    </td>';
                }
            }
        }
    }

        $table .='
                </tr>
            </tbody>
        </table>';

        return $table;
    }

    public function sendConfirmationEmail(Coupon $coupon) {
        $subject = 'Bekræftelse - EM 2024 Tips';
        $from_email = 'tips-manager@jcrl.dk';
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = 'tips-manager@jcrl.dk';
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';

        $table = $this->generateTipsTable($coupon->predictions);
                
        $message = sprintf(
            "Hej %s\n\n Fedt du vil være med! Husk at overføre 100 kr. til 30 32 12 12 så din kupon tæller med i konkurrencen.\n\n Her er dine tips:\n%s",
            $coupon->name, $table);

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));
        
        $headers_string = implode("\r\n", $headers);
      
        if (mail($coupon->mail, $subject, $message, $headers_string)) {
          echo 'Email sent successfully';
        } else {
          echo 'Email not sent';
        }
    }

    private function generateTipsTable(array $predictions) {
        $matches = $this->getSortedMatchesByStartDate();

        echo '
        <style>
            table {
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 14px;
                font-family: Arial, sans-serif;
            }
            
            th,
            td {
                padding: 8px 8px;
                border: 1px solid #ddd;
                text-align: center;
            }
            
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            
            td div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }
            
            td span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        </style>
        ';

        $table = '
        <table>
            <thead>
                <tr>
                    <th>Kampe</th>
                    <th>Tips</th>';
                        
        
        $table .= '
                </tr>
            </thead>
            <tbody>';
        foreach($matches as $match) {
            $table .= '
                <tr>
                    <td>
                        <div>
                            <span>'. $match->participants[0]->name . ' - ' . $match->participants[1]->name .'</span>
                        </div>
                    </td>';
            foreach($predictions as $prediction) {
                if($prediction->id === $match->id) {
                    $table .= '
                    <td>
                        ' . $prediction->prediction .'
                    </td>';
                }
            }
    }

        $table .='
                </tr>
            </tbody>
        </table>';

        return $table;
    }
}