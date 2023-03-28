<?php

// Include files
include_once '../config/Database.php';

class CouponRepository
{

    private $api = "https://appservicesport.tv2api.dk/tournaments/18308/events";


    public function getPending()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();
    }

    public function getAccepted()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();
    }

    public function save(Coupon $coupon)
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();


        $query = "
                INSERT INTO 
                    coupons
                SET 
                    name = :name,
                    mail = :mail,
                    predictions = '" . json_encode($coupon->predictions) . "'
            ";

        $statement = $connection->prepare($query);

        // Bind data
        $statement->bindParam(":name", $coupon->name);
        $statement->bindParam(":mail", $coupon->mail);
        // $statement->bindParam(":preditions", $coupon->predictions);

        return $statement->execute();
    }
}
