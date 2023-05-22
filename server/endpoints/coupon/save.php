<?php
include_once dirname(__DIR__, 2) . '/config/Cors.php';
include_once dirname(__DIR__, 2) . '/coupon/Coupon.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponRepository.php';
include_once dirname(__DIR__, 2) . '/coupon/CouponService.php';

// Get incoming data
$data = json_decode(file_get_contents("php://input"));

if (empty($data->name) || empty($data->mail) || empty($data->predictions)) {

    // Send error response
    echo json_encode([
        "message" => "Values are missing",
        "code" => 400
    ]);
    exit(0);
}
$coupon = new Coupon($data->name, $data->mail, false, json_decode($data->predictions), $data->subscribeToMails);

$couponRepo = new CouponRepository();
$couponService = new CouponService();

try {

    $couponRepo->save($coupon);
    $couponService->sendConfirmationEmail($coupon);
    $couponService->sendNewParticipantEmail($coupon);

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
