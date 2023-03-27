<?php

// Include files
include_once '../config/Cors.php';
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

        try {
            $query = "
                INSERT INTO 
                    coupons
                SET 
                    name = :name,
                    mail = :mail,
                    preditions = :preditions
            ";

            $statement = $connection->prepare($query);

            // Bind data
            $statement->bindParam(":name", $coupon->name);
            $statement->bindParam(":mail", $coupon->mail);
            $statement->bindParam(":preditions", $coupon->predictions);

            if ($statement->execute()) {
                return true;
            }
        } catch (\Exception $e) {
            return false;
        }
    }
}
