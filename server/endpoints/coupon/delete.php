<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';

$couponRepo = new CouponRepository();

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->coupons_id)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400,
    ]);
    exit(0);
}

try {
    $couponRepo->delete($data->coupons_id);

    echo json_encode([
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
