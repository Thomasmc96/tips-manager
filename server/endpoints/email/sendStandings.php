<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponService.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

$message = !empty($data->message) ? $data->message : '';

$couponRepo = new CouponRepository();
$couponService = new CouponService();

$coupons = $couponRepo->getEmailSubscribers();

try {
    foreach($coupons as $coupon) {
        $couponService->sendStandingsEmail($coupon['mail'], $coupon['name'], $message);
    }

    echo json_encode([
        "code" => 200,
    ]);
} catch (\Exception $e) {
    echo json_encode([
        "message" => $e,
        "code" => 500,
        'message' => $message

    ]);
}

