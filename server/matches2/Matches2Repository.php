<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Matches2Repository
{
    public function getAll() {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                matches2
            ORDER BY
                kickoff_dtm
        ";

        $statement = $connection->prepare($query);

        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save(Matches2 $matches2) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            INSERT INTO 
                matches2
            SET 
                home_team = :homeTeam,
                away_team = :awayTeam,
                kickoff_dtm = :kickoff,
                home_team_goals = :homeTeamGoals,
                away_team_goals = :awayTeamGoals
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":homeTeam", $matches2->homeTeam);
        $statement->bindParam(":awayTeam", $matches2->awayTeam);
        $statement->bindParam(":kickoff", $matches2->kickoff);
        $statement->bindParam(":homeTeamGoals", $matches2->homeTeamGoals);
        $statement->bindParam(":awayTeamGoals", $matches2->awayTeamGoals);

        $statement->execute();
        return $connection->lastInsertId();
    }

    public function getById($id) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                matches2
            WHERE
                matches2_id = :id
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":id", $id);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function delete($id) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            DELETE FROM
                matches2
            WHERE
                matches2_id = :id
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":id", $id);

        return $statement->execute();
    }

    public function update($id, Matches2 $matches2) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            UPDATE
                matches2
            SET 
                home_team = :homeTeam,
                away_team = :awayTeam,
                kickoff_dtm = :kickoff,
                home_team_goals = :homeTeamGoals,
                away_team_goals = :awayTeamGoals
            WHERE
                matches2_id = :matches2_id
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":homeTeam", $matches2->homeTeam);
        $statement->bindParam(":awayTeam", $matches2->awayTeam);
        $statement->bindParam(":kickoff", $matches2->kickoff);
        $statement->bindParam(":homeTeamGoals", $matches2->homeTeamGoals);
        $statement->bindParam(":awayTeamGoals", $matches2->awayTeamGoals);
        $statement->bindParam(":matches2_id", $id);

        return $statement->execute();
    }
}