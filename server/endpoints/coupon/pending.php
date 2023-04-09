<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';

$couponRepo = new CouponRepository();

try {
    $coupons = $couponRepo->getPending();

    echo json_encode([
        "coupons" => $coupons,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
