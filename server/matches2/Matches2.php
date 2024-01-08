<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Matches2
{
    public $matches2_id;
    public $home_team;
    public $away_team;
    public $kickoff_dtm;
    public $home_team_goals;
    public $away_team_goals;

    public function __construct(
        string $home_team, 
        string $away_team, 
        bool $kickoff_dtm,
        int $home_team_goals,
        int $away_team_goals,
        )
    {
        $this->home_team = $home_team;
        $this->away_team = $away_team;
        $this->kickoff_dtm = $kickoff_dtm;
        $this->home_team_goals = $home_team_goals;
        $this->away_team_goals = $away_team_goals;
    }

    public function setId($id) {
        $this->matches2_id = $id;
    }
}
