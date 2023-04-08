<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class CouponRepository
{
    public function getAll()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                coupons
        ";

        $statement = $connection->prepare($query);

        $statement->execute();
        return $statement->fetchAll();
    }

    public function getPending()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                coupons
            WHERE
                paid = :paid
        ";

        $statement = $connection->prepare($query);

        $paid = 0;
        $statement->bindParam(":paid", $paid);

        $statement->execute();
        return $statement->fetchAll();
    }

    public function getAccepted()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                coupons
            WHERE
                paid = :paid
        ";

        $statement = $connection->prepare($query);

        $paid = 1;
        $statement->bindParam(":paid", $paid);

        $statement->execute();
        return $statement->fetchAll();
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
                    predictions = :preditions,
                    subscribeToMails = :subscribeToMails
            ";

        $statement = $connection->prepare($query);

        $predictions_encoded = json_encode($coupon->predictions);

        $statement->bindParam(":name", $coupon->name);
        $statement->bindParam(":mail", $coupon->mail);
        $statement->bindParam(":preditions", $predictions_encoded);
        $statement->bindParam(":subscribeToMails", $coupon->subscribeToMails);

        return $statement->execute();
    }
}
