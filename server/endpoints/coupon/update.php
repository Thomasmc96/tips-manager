<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->coupons_id)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400
    ]);
    exit(0);
}

$couponRepo = new CouponRepository();

try {

    $coupon = $couponRepo->getById($data->coupons_id);
    $coupon->name = $data->name;
    $couponRepo->update($coupon);

    echo json_encode([
        "message" => "Success",
        "code" => 200
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
