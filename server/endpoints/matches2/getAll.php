<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2Repository.php';

$matches2Repo = new Matches2Repository();

try {
    $matches2 = $matches2Repo->getAll();
    
    echo json_encode([
        "matches2" => $matches2,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
