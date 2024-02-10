<?php
include_once __DIR__ . '/CouponRepository.php';
include_once dirname(__DIR__) . '/matches2/Matches2Repository.php';
include_once dirname(__DIR__) . '/matches2/Matches2.php';

class CouponService
{

    private $from_email = "tips-manager@thch.dk";
    private $url = 'tips.thch.dk';

    public function __construct()
    {
    }

    public function getCouponsWithResults(): array
    {
        $couponRepo = new CouponRepository();
        $matches2Repo = new Matches2Repository();
        $coupons = $couponRepo->getAccepted();
        $matches2 = $matches2Repo->getAll();

        if (!$coupons) {
            return [];
        }

        foreach ($coupons as $coupon_index => $coupon) {
            $predictions = json_decode($coupon['predictions']);

            $amountCorrect = 0;

            foreach ($predictions as $prediction_index => $prediction) {
                // var_dump($matches2);
                $match_array = array_values(array_filter($matches2, fn ($match) => $match['matches2_id'] === $prediction->id));
                if (empty($match_array)) {
                    continue;
                }
                
                $match = new Matches2(
                    $match_array[0]['home_team'],
                    $match_array[0]['away_team'],
                    $match_array[0]['kickoff_dtm'],
                    $match_array[0]['home_team_goals'],
                    $match_array[0]['away_team_goals'],
                    $match_array[0]['updated_dtm'],
                );

                $match->setId($match_array[0]['matches2_id']);

                $homeTeamScore = $match->homeTeamGoals;
                $awayTeamScore = $match->awayTeamGoals;

                $tipResult = "";
                if ($homeTeamScore > $awayTeamScore) {
                    $tipResult = "1";
                } else if ($homeTeamScore < $awayTeamScore) {
                    $tipResult = "2";
                } else if ($homeTeamScore === $awayTeamScore) {
                    $tipResult = "x";
                }

                if ($prediction->prediction === $tipResult && $this->isFinished($match)) {
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

    private function isFinished($match) {
        if(is_array($match)) {
            if($match['home_team_goals'] !== null && $match['away_team_goals'] !== null) {
                return true;
            }
        } else {
            if($match->homeTeamGoals !== null && $match->awayTeamGoals !== null) {
                return true;
            }
        }
        return false;
    }

    public function getSortedByAmountCorrect()
    {
        $couponsWithResult = $this->getCouponsWithResults();

        usort($couponsWithResult, function ($a, $b) {
            if ($a['amountCorrect'] > $b['amountCorrect']) {
                return -1;
            } elseif ($a['amountCorrect'] < $b['amountCorrect']) {
                return 1;
            }
            return 0;
        });

        return $couponsWithResult;
    }

    private function getSortedMatchesByStartDate()
    {
        $matches2Repo = new Matches2Repository();
        $matches2 = $matches2Repo->getAll();

        usort($matches2, function ($a, $b) {
            if ($a['kickoff_dtm'] > $b['kickoff_dtm']) {
                return 1;
            } elseif ($a['kickoff_dtm'] < $b['kickoff_dtm']) {
                return -1;
            }
            return 0;
        });

        return $matches2;
    }

    public function sendStandingsEmail($to_email, $to_name, $custom_message)
    {
        setlocale(LC_TIME, 'da_DK');
        $subject = 'Stilling - EM 2024 Tips';
        $from_email = $this->from_email;
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = $this->from_email;
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';

        $table = $this->generateStandingsTable();
        $tableStyles = $this->generateTableStyles();
        $message = sprintf(
            "
            <html>
                <head>%s</head>
                <body>
                    <h2>Hej %s</h2>
                    " . ($custom_message ? $custom_message : " 
                    <p>Her er nuværende stilling for EM 2024 tipskonkurrencen.</p>" ) ."
                    <p>Du kan også se stillingen <a href='%s'>her</a>.</p>
                </body>
            </html>
            %s",
            $tableStyles,
            $to_name,
            $this->url,
            $table
        );

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));

        $headers_string = implode("\r\n", $headers);

        if (!mail($to_email, $subject, $message, $headers_string)) {
            throw new Exception('Email not sent');
        }
    }


    private function generateStandingsTable()
    {
        $matches = $this->getSortedMatchesByStartDate();
        $sortedStandings = $this->getSortedByAmountCorrect();

        $table = '
        <table>
            <thead>
                <tr>
                    <th></th>';

        foreach ($sortedStandings as $sortedStanding) {
            $table .= '
                <th>
                    <div>
                        <span>' . $sortedStanding['name'] . '</span>
                        <span>' . $sortedStanding['amountCorrect'] . ' ✔</span>
                    </div>
                </th>';
        }
        $table .= '
                </tr>
            </thead>
            <tbody>';
        foreach ($matches as $match) {
            $table .= '
                <tr>
                    <td>
                        <div>
                            <div>' . $this->countryName($match['home_team']) . ' - ' . $this->countryName($match['away_team']) . '</div>
                            <div>' . ($this->isFinished($match) ? $match['home_team_goals'] . " - " . $match['away_team_goals'] : strftime('%e. %B %H:%M', strtotime($match['kickoff_dtm']))) . '</div>
                        </div>
                    </td>';
            foreach ($sortedStandings as $sortedStanding) {
                foreach ($sortedStanding['predictions'] as $prediction) {
                    if ($prediction->id === $match['matches2_id']) {
                        $table .= '
                        <td style="' . ($prediction->won && $this->isFinished($match) ? 'background-color:#098b54' : (!$prediction->won && $this->isFinished($match) ? 'background-color:red' : '')) . '">
                            ' . $prediction->prediction . '
                        </td>';
                    }
                }
            }
        }

        $table .= '
                </tr>
            </tbody>
        </table>';

        return $table;
    }

    public function sendConfirmationEmail(Coupon $coupon): bool
    {
        $subject = 'Bekræftelse - EM 2024 Tips';
        $from_email = $this->from_email;
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = $this->from_email;
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';

        $table = $this->generateTipsTable($coupon->predictions);
        $tableStyles = $this->generateTableStyles();

        $message = sprintf(
            "
        <html>
            <head>%s</head>
                <body>
                    <h2>Hej %s</h2> 
                    <p>Fedt du vil være med! Husk at overføre 100 kr. til 30 32 12 12. Når du har gjort det, så aktiverer vi din kupon så den tæller med i konkurrencen.
                    Held og lykke!
                    </p>
                    <p>Her er dine tips:</p><br>%s
                </body>
        </html>",
            $tableStyles,
            $coupon->name,
            $table
        );

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));

        $headers_string = implode("\r\n", $headers);

        return mail($coupon->mail, $subject, $message, $headers_string);
    }

    public function sendNewParticipantEmail(Coupon $coupon): bool
{
    // TODO: Change this mail
    $to = "thomas96mc@gmail.com";
    $subject = 'Ny kupon - EM 2024 Tips';
    $from_email = $this->from_email;
    $from_name = 'Tipskupon - EM 2024';
    $reply_to_email = $this->from_email;
    $reply_to_name = 'Tipskupon - EM 2024';
    $charset = 'UTF-8';

    $style = "
    <style>
        .actionBtn {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            display: inline-flex;
            background-color: #FCBC02;
            padding: 8px;
            border-radius: 4px;
            color: black !important;
            text-decoration: none;
        }
    </style>
    ";

    $message = sprintf(
        "
        <html>
            <head>%s</head>
            <body>
                <h2>Hej René</h2>
                <p>En ny kupon er lige blevet udfyldt af %s. Husk at bekræfte tilmeldelsen når der bliver overført 100 kr.</p>
                <a href='%s' class='actionBtn'>Se dashboard</a>
            </body>
        </html>",
        $style,
        $coupon->name,
        "http://" . $_SERVER['HTTP_HOST'] . "/tilmeldinger" 
    );

    $headers = [];
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/html; charset={$charset}";
    $headers[] = "From: {$from_name} <{$from_email}>";
    $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "X-Priority: 3";
    $headers[] = "X-Assp-ID: " . md5(uniqid(time()));

    $headers_string = implode("\r\n", $headers);

    return mail($to, $subject, $message, $headers_string);
}


    private function generateTipsTable(array $predictions)
    {
        $matches = $this->getSortedMatchesByStartDate();

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
        foreach ($matches as $match) {
            $table .= '
                <tr>
                    <td>
                        <div>
                            <span>' . $this->countryName($match['home_team']) . ' - ' . $this->countryName($match['away_team']) . '</span>
                        </div>
                    </td>';
            foreach ($predictions as $prediction) {
                if ($prediction->id === $match['matches2_id']) {
                    $table .= '
                    <td>
                        ' . $prediction->prediction . '
                    </td>';
                }
            }
        }

        $table .= '
                </tr>
            </tbody>
        </table>';

        return $table;
    }

    private function generateTableStyles()
    {
        return '<style>
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
        
        td span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        </style>';
    }

    public function sendApprovedEmail(Coupon $coupon) {
        $to = $coupon->mail;
        $subject = 'Så du med - EM 2024 Tips';
        $from_email = $this->from_email;
        $from_name = 'Tipskupon - EM 2024';
        $reply_to_email = $this->from_email;
        $reply_to_name = 'Tipskupon - EM 2024';
        $charset = 'UTF-8';

        $style = "
        <style>
            .actionBtn {
                margin-top: 20px;
                margin-left: auto;
                margin-right: auto;
                display: inline-flex;
                background-color: #FCBC02;
                padding: 8px;
                border-radius: 4px;
                color: black !important;
                text-decoration: none;
            }
        </style>
        ";

        $message = sprintf(
            "
            <html>
                <head>%s</head>
                <body>
                    <h2>Hej %s</h2>
                    <p>Din kupon er netop blevet bekræfter!</p>
                    <a href='%s' class='actionBtn'>Se stillingen</a>
                </body>
            </html>",
            $style,
            $coupon->name,
            "http://" . $_SERVER['HTTP_HOST'] 
        );

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset={$charset}";
        $headers[] = "From: {$from_name} <{$from_email}>";
        $headers[] = "Reply-To: {$reply_to_name} <{$reply_to_email}>";
        $headers[] = "X-Mailer: PHP/" . phpversion();
        $headers[] = "X-Priority: 3";
        $headers[] = "X-Assp-ID: " . md5(uniqid(time()));

        $headers_string = implode("\r\n", $headers);

        // return mail($to, $subject, $message, $headers_string);
        return true;
    }

    private function countryName($code) {
        return array_values(array_filter($this->countries, fn($country) => $country['code'] === $code))[0]['name'];
    }

    private array $countries = [
        [
          'code'=> 'ger',
          'name'=> 'Tyskland'
        ],
        [
          'code'=> 'bel',
          'name'=> 'Belgien',
        ],
        [
          'code'=> 'fra',
          'name'=> 'Frankrig'
        ],
        [
          'code'=> 'por',
          'name'=> 'Portugal'
        ],
        [
          'code'=> 'esp',
          'name'=> 'Spanien'
        ],
        [
          'code'=> 'sco',
          'name'=> 'Skotland'
        ],
        [
          'code'=> 'tur',
          'name'=> 'Tyrkiet'
        ],
        [
          'code'=> 'aut',
          'name'=> 'Østrig'
        ],
        [
          'code'=> 'eng',
          'name'=> 'England'
        ],
        [
          'code'=> 'hun',
          'name'=> 'Ungarn'
        ],
        [
          'code'=> 'svk',
          'name'=> 'Slovakiet'
        ],
        [
          'code'=> 'alb',
          'name'=> 'Albanien'
        ],
        [
          'code'=> 'den',
          'name'=> 'Danmark'
        ],
        [
          'code'=> 'ned',
          'name'=> 'Holland'
        ],
        [
          'code'=> 'rom',
          'name'=> 'Rumænien'
        ],
        [
          'code'=> 'sui',
          'name'=> 'Schweiz'
        ],
        [
          'code'=> 'srb',
          'name'=> 'Serbien'
        ],
        [
          'code'=> 'slo',
          'name'=> 'Slovenien'
        ],
        [
          'code'=> 'ita',
          'name'=> 'Italien'
        ],
        [
          'code'=> 'cze',
          'name'=> 'Tjekkiet'
        ],
        [
          'code'=> 'cro',
          'name'=> 'Kroatien'
        ],
        [
          'code'=> 'plvinderA',
          'name'=> 'Play off vinder A'
        ],
        [
          'code'=> 'plvinderB',
          'name'=> 'Play off vinder B'
        ],
        [
          'code'=> 'plvinderC',
          'name'=> 'Play off vinder C'
        ],
        [
          'code'=> 'pol',
          'name'=> 'Polen'
        ],
        [
          'code'=> 'est',
          'name'=> 'Estland'
        ],
        [
          'code'=> 'wal',
          'name'=> 'Wales'
        ],
        [
          'code'=> 'fin',
          'name'=> 'Finland'
        ],
        [
          'code'=> 'isr',
          'name'=> 'Israel'
        ],
        [
          'code'=> 'ice',
          'name'=> 'Island'
        ],
        [
          'code'=> 'bos',
          'name'=> 'Bosnien'
        ],
        [
          'code'=> 'ukr',
          'name'=> 'Ukraine'
        ],
        [
          'code'=> 'geo',
          'name'=> 'Georgien'
        ],
        [
          'code'=> 'lux',
          'name'=> 'Luxembourg'
        ],
        [
          'code'=> 'gre',
          'name'=> 'Grækenland'
        ],
        [
          'code'=> 'kaz',
          'name'=> 'Kasakhstan'
        ],
    ]; 
}
