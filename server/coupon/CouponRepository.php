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
        return $statement->fetchAll(PDO::FETCH_ASSOC);
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
        return $statement->fetchAll(PDO::FETCH_ASSOC);
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
        return $statement->fetchAll(PDO::FETCH_ASSOC);
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
        $subscribe = $coupon->subscribeToMails ? 1 : 0;

        $statement->bindParam(":name", $coupon->name);
        $statement->bindParam(":mail", $coupon->mail);
        $statement->bindParam(":preditions", $predictions_encoded);
        $statement->bindParam(":subscribeToMails", $subscribe);

        return $statement->execute();
    }

    public function getEmailSubscribers()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                coupons
            WHERE
                paid = :paid AND subscribeToMails = :subscribeToMails
        ";

        $statement = $connection->prepare($query);

        $paid = 1;
        $subscribeToMails = 1;
        $statement->bindParam(":paid", $paid);
        $statement->bindParam(":subscribeToMails", $subscribeToMails);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function approve($coupons_id)
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
                UPDATE 
                    coupons
                SET 
                    paid = 1
                WHERE
                    coupons_id = :coupons_id
            ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":coupons_id", $coupons_id);

        return $statement->execute();
    }
}
