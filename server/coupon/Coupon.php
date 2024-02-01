<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Coupon
{
    public $coupons_id;
    public $name;
    public $mail;
    public $paid;
    public $predictions;
    public $subscribeToMails;
    public $updated_dtm;

    public function __construct(string $name, string $mail, bool $paid, array $predictions, bool $subscribeToMails, string $updated_dtm)
    {
        $this->name = $name;
        $this->mail = $mail;
        $this->paid = $paid;
        $this->predictions = $predictions;
        $this->subscribeToMails = $subscribeToMails;
        $this->updated_dtm = $updated_dtm;
    }

    public function setId($id) {
        $this->coupons_id = $id;
    }
}
