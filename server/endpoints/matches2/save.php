<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2.php';
include_once dirname(__DIR__, 2) . '/matches2/Matches2Repository.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->homeTeam) || empty($data->awayTeam) || empty($data->kickOff)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400
    ]);
    exit(0);
}
$match2 = new Matches2(
    $data->homeTeam,
    $data->awayTeam, 
    $data->kickOff,
    $data->homeTeamGoals,
    $data->awayTeamGoals
);

$matches2Repo = new Matches2Repository();

try {

    $id = $matches2Repo->save($match2);

    echo json_encode([
        "message" => "Success",
        "code" => 200,
        'data' => $data,
        'id' => $id,

    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => $e,
        "code" => 500,
        'data' => $data,
    ]);
}
