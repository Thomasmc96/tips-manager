<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/admin/Admin.php';
include_once dirname(__DIR__, 2) . '/admin/AdminRepository.php';

$adminRepo = new adminRepository();

$id = isset($_GET['id']) ?? $_GET['id'];

if (empty($id)) {
    echo json_encode([
        "message" => "Missing id",
        "code" => 400
    ]);
    exit();
}

try {
    $admins = $adminRepo->getById($id);

    echo json_encode([
        "admins" => $admins,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
