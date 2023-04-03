<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/Coupon/CouponService.php';

$couponService = new CouponService();

$couponService->sendEmail('thomas96mc@gmail.com');
