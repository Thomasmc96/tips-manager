<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponService.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';

$couponRepo = new CouponRepository();
$couponService = new CouponService();

$coupons = $couponRepo->getEmailSubscribers();

foreach($coupons as $coupon) {
    $couponService->sendStandingsEmail($coupon['mail'], $coupon['name']);
}

