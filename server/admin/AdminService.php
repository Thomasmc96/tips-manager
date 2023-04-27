<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

use Firebase\JWT\JWT;


class AdminService
{
    public function login(Admin $admin, $passwordAttempt)
    {


        if (password_verify($passwordAttempt, $admin->password)) {
            $secret_key = "todo-app-key";
            $issuer_claim = "THE_ISSUER"; // this can be the servername
            $audience_claim = "THE_AUDIENCE";
            $issuedat_claim = time(); // issued at
            $notbefore_claim = $issuedat_claim; //not before in seconds
            $expire_claim = $issuedat_claim + 3600; // expire time in seconds
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

            $jwt = JWT::encode($token, $secret_key, 'HS256');
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

    public function verify(Admin $admin)
    {
    }
}
