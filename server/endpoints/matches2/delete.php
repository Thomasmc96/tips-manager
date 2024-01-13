<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2Repository.php';

$matches2Repo = new Matches2Repository();

$id = (int)$_GET['id'] ?? null;
if (empty($id)) {
    echo json_encode([
        "message" => "Missing id",
        "code" => 400
    ]);
    exit();
}

try {
    $match2 = $matches2Repo->delete($id);
    
    echo json_encode([
        "match2" => $match2,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
