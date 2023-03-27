<?php
include_once '../config/Cors.php';
include_once '../coupon/Coupon.php';
include_once '../coupon/CouponRepository.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->mail) || empty($data->predictions)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400
    ]);
    exit(0);
}

$coupon = new Coupon($data->name, $data->mail, false, json_decode($data->predictions));

$couponRepo = new CouponRepository();
try {
    $couponRepo->save($coupon);

    // Send error response
    echo json_encode([
        "message" => "Success",
        "code" => 200
    ]);
} catch (\Exception $e) {
    // Send error response
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
