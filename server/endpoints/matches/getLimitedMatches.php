<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches/Matches.php';
include_once dirname(__DIR__, 2) . '/matches/MatchesService.php';

$matchesService = new MatchesService();

$limit = (int)$_GET['limit'] ?? null;

if (empty($limit)) {
    echo json_encode([
        "message" => "Missing limit",
        "code" => 400
    ]);
    exit();
}

try {
    $matches = $matchesService->getLimited($limit);
    
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
