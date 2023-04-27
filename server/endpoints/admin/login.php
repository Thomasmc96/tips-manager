<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/admin/Admin.php';
include_once dirname(__DIR__, 2) . '/admin/AdminRepository.php';
include_once dirname(__DIR__, 2) . '/admin/AdminService.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->mail) || empty($data->password)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400,
        "data" => $data
    ]);
    exit(0);
}

$adminRepo = new AdminRepository();
$adminService = new AdminService();

try {
    $admin = $adminRepo->getByMail($data->mail);
    $oAdmin = new Admin($admin['name'], $admin['mail'], $admin['password']);

    $adminService->login($oAdmin, $data->password);
} catch (\Exception $e) {
    json_encode([
        "code" => 400,
        "message" => "Login mislykkedes"
    ]);
}
