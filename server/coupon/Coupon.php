<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Coupon
{
    public $name;
    public $mail;
    public $paid;
    public $predictions;

    public function __construct(string $name, string $mail, bool $paid, array $predictions)
    {
        $this->name = $name;
        $this->mail = $mail;
        $this->paid = $paid;
        $this->predictions = $predictions;
    }
}
