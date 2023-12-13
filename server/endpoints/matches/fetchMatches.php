<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches/Matches.php';
include_once dirname(__DIR__, 2) . '/matches/MatchesRepository.php';

/**https://match.uefa.com/v5/matches?competitionId=3&seasonYear=2024&phase=QUALIFYING&fromDate=2023-03-01&toDate=2023-06-13&utcOffset=2&order=ASC&offset=0&limit=500 */
/**https://appservicesport.tv2api.dk/tournaments/18308/events */ /**https://sport.tv2.dk/fodbold/em/kampprogram */ /**https://sport.tv2.dk/fodbold/em/sendeplan */

try {

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://appservicesport.tv2api.dk/tournaments/18308/events',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);

$matches = new Matches($response);
$matchesRepository = new MatchesRepository();

$matchesRepository->save($matches);
} catch(\Exception $e) {
    echo json_encode([
      "message" => $e,
      "code" => 500
  ]);
}