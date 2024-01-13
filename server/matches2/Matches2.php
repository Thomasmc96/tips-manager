<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';

class Matches2
{
    public $matches2Id;
    public $homeTeam;
    public $awayTeam;
    public $kickoff;
    public $homeTeamGoals;
    public $awayTeamGoals;

    public function __construct(
        string $homeTeam, 
        string $awayTeam, 
        string $kickoff,
        int $homeTeamGoals,
        int $awayTeamGoals,
        )
    {
        $this->homeTeam = $homeTeam;
        $this->awayTeam = $awayTeam;
        $this->kickoff = $kickoff;
        $this->homeTeamGoals = $homeTeamGoals;
        $this->awayTeamGoals = $awayTeamGoals;
    }

    public function setId($id) {
        $this->matches2Id = $id;
    }
}
