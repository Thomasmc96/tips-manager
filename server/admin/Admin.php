<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Admin
{
    public $id;
    public $name;
    public $mail;
    public $password;

    public function __construct(string $name, string $mail, string $password)
    {
        $this->name = $name;
        $this->mail = $mail;
        $this->password = $password;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }
}
