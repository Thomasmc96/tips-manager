<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/admin/Admin.php';
include_once dirname(__DIR__, 2) . '/admin/AdminRepository.php';
include_once dirname(__DIR__, 2) . '/admin/AdminService.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->mail) || empty($data->password)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400,
        "data" => $data
    ]);
    exit(0);
}
$admin = new Admin($data->name, $data->mail, $data->password);

$adminRepo = new AdminRepository();
$adminService = new AdminService();

try {

    $adminRepo->save($admin);

    echo json_encode([
        "message" => "Success",
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
