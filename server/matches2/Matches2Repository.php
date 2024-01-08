<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Matches2Repository
{
    public function getLatest() {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            SELECT
                *
            FROM
                matches2
            ORDER BY
                kickoff_dtm DESC
            LIMIT 1
        ";

        $statement = $connection->prepare($query);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function save(Matches2 $matches2) {
        $datebaseService = new DatabaseService();
        $connection = $datebaseService->getConnection();

        $query = "
            INSERT INTO 
                matches2
            SET 
                home_team = :home_team,
                away_team = :away_team,
                kickoff_dtm = :kickoff_dtm,
                home_team_goals = :home_team_goals,
                away_team_goals = :away_team_goals
        ";

        $statement = $connection->prepare($query);

        $statement->bindParam(":home_team", $matches2->home_team);
        $statement->bindParam(":away_team", $matches2->away_team);
        $statement->bindParam(":kickoff_dtm", $matches2->kickoff_dtm);
        $statement->bindParam(":home_team_goals", $matches2->home_team_goals);
        $statement->bindParam(":away_team_goals", $matches2->away_team_goals);

        return $statement->execute();
    }
}