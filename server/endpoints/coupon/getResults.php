<?php

include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponService.php';

try {
    $couponService = new CouponService();
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
