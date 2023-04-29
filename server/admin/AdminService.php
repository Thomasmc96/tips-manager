<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';
require_once dirname(__DIR__) . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AdminService
{
    private $secret_key = "tips-manager-key";
    private $algo = "HS256";

    public function login(Admin $admin, $passwordAttempt)
    {
        if (password_verify($passwordAttempt, $admin->password)) {
            $issuer_claim = "THE_ISSUER"; // this can be the servername
            $audience_claim = "THE_AUDIENCE";
            $issuedat_claim = time(); // issued at
            $notbefore_claim = $issuedat_claim; //not before in seconds
            $expire_claim = $issuedat_claim + 2592000; // expire time in seconds (259200 = 30 days)
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => array(
                    "id" => $admin->id,
                    "name" => $admin->name,
                    "mail" => $admin->mail
                )
            );

            $jwt = JWT::encode($token, $this->secret_key, $this->algo);
            echo json_encode(
                array(
                    "message" => "Successful login",
                    "code" => 200,
                    "jwt" => $jwt,
                    "mail" => $admin->mail,
                    "name" => $admin->name,
                    "id" => $admin->id,
                    "expireAt" => $expire_claim
                )
            );
        } else {
            echo json_encode(array("message" => "Wrong password", "code" => 500));
        }
    }

    public function verify($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secret_key, $this->algo));
            echo json_encode(array(
                "message" => "Access granted",
                "code" => 200
            ));
        } catch (Exception $e) {
            echo json_encode(array(
                "message" => "Access denied.",
                "code" => 403,
                "error" => $e->getMessage(),
                "token" => $token,
            ));
        }
    }
}
