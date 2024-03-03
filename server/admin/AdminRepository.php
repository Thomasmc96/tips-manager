<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class AdminRepository
{
    public function getById($id)
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
                SELECT  
                    *
                FROM
                    admins
                WHERE 
                    admins_id = :id
            ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":id", $id);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
    
    public function getAll()
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
                SELECT  
                    *
                FROM
                    admins
            ";

        $statement = $connection->prepare($query);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByMail($mail)
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
                SELECT  
                    *
                FROM
                    admins
                WHERE 
                    mail = :mail
            ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":mail", $mail);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function save(Admin $admin)
    {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
                INSERT INTO 
                    admins
                SET 
                    name = :name,
                    mail = :mail,
                    password = :password
            ";

        $statement = $connection->prepare($query);

        $password = password_hash($admin->password, PASSWORD_BCRYPT);

        $statement->bindParam(":name", $admin->name);
        $statement->bindParam(":mail", $admin->mail);
        $statement->bindParam(":password", $password);

        return $statement->execute();
    }
}
