<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class CouponRepository
{
    public function getAll()
    {
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

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

    public function getById($coupons_id)
    {
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

        $query = "
                SELECT  
                    *
                FROM 
                    coupons
                WHERE
                    coupons_id = :coupons_id
            ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":coupons_id", $coupons_id);

        if (!$statement->execute()) {
            return false;
        }

        $row = $statement->fetch(PDO::FETCH_ASSOC);
        $coupon = new Coupon($row['name'], $row['mail'], $row['paid'], json_decode($row['predictions']), $row['subscribeToMails']);
        $coupon->coupons_id = (int)$coupons_id;
        return $coupon;
    }

    public function update(Coupon $coupon)
    {
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

        $query = "
                UPDATE
                    coupons
                SET
                    name = :name,
                    mail = :mail,
                    predictions = :preditions,
                    subscribeToMails = :subscribeToMails,
                    paid = :paid
                WHERE
                    coupons_id = :coupons_id
        ";

        $statement = $connection->prepare($query);

        $predictions_encoded = json_encode($coupon->predictions);
        $subscribe = $coupon->subscribeToMails ? 1 : 0;
        $paid = $coupon->paid ? 1 : 0;

        $statement->bindParam(":name", $coupon->name);
        $statement->bindParam(":mail", $coupon->mail);
        $statement->bindParam(":preditions", $predictions_encoded);
        $statement->bindParam(":subscribeToMails", $subscribe);
        $statement->bindParam(":paid", $paid);
        $statement->bindParam(":coupons_id", $coupon->coupons_id);

        return $statement->execute();
    }

    public function delete($coupons_id)
    {
        $databaseService = new DatabaseService();
        $connection = $databaseService->getConnection();

        $query = "
                DELETE FROM 
                    coupons
                WHERE
                    coupons_id = :coupons_id
            ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":coupons_id", $coupons_id);

        return $statement->execute();
    }
}
