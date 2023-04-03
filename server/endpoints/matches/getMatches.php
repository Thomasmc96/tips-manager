<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches/Matches.php';
include_once dirname(__DIR__, 2) . '/matches/MatchesRepository.php';

$matchesRepo = new MatchesRepository();

try {
    $matches = $matchesRepo->getLatest();
    
    echo json_encode([
        "matches" => $matches,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
