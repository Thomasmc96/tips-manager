<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches/Matches.php';
include_once dirname(__DIR__, 2) . '/matches/MatchesRepository.php';

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