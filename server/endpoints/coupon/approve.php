<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponService.php';

$couponRepo = new CouponRepository();
$couponService = new CouponService();

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
    $couponRepo->approve($data->coupons_id);

    $coupon = $couponRepo->getById($data->coupons_id);
    $couponService->sendApprovedEmail($coupon);
    echo json_encode([
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
