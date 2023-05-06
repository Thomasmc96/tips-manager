<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class MatchesRepository
{
    public function getLatest() {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                matches
            ORDER BY
                matches_id DESC
            LIMIT 1
        ";

        $statement = $connection->prepare($query);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function save(Matches $matches) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            INSERT INTO 
                matches
            SET 
                data = :data
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":data", $matches->data);

        return $statement->execute();
    }
}