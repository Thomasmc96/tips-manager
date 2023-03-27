<?php

// Include files
include_once './config/Cors.php';
include_once './config/Database.php';

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
