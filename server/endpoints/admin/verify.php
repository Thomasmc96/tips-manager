<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/admin/Admin.php';
include_once dirname(__DIR__, 2) . '/admin/AdminRepository.php';
include_once dirname(__DIR__, 2) . '/admin/AdminService.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

$authorizationHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
$token = str_replace('Bearer ', '', $authorizationHeader);
$headers = apache_request_headers();

if (!$token) {
    echo json_encode(array(
        "message" => "No token supplied",
        "code" => 400,
    ));
    exit(0);
}

$adminRepo = new AdminRepository();
$adminService = new AdminService();

try {
    $adminService->verify($token);
} catch (\Exception $e) {
    json_encode([
        "code" => 400,
        "message" => "Login mislykkedes"
    ]);
}
