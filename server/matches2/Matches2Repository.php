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
                kickoff DESC
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

        return $statement->execute();
    }
}