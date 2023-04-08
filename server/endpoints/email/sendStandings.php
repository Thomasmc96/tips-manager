<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/Coupon/CouponService.php';
include_once dirname(__DIR__, 2) . '/Coupon/CouponRepository.php';

$couponRepo = new CouponRepository();
$couponService = new CouponService();

$coupons = $couponRepo->getEmailSubscribers();

foreach($coupons as $coupon) {
    $couponService->sendEmail($coupon['mail'], $coupon['name']);
}

