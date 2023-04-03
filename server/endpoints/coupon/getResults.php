<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/Coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/Coupon/CouponRepository.php';
include_once dirname(__DIR__, 2) . '/Coupon/CouponService.php';

$couponService = new CouponService();

try {
    $results = $couponService->getCouponsWithResults();

    echo json_encode([
        "coupons" => $results,
        "code" => 200
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500
    ]);
}
