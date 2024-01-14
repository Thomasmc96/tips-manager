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
    public $updatedDtm;

    public function __construct(
        string $homeTeam, 
        string $awayTeam, 
        string $kickoff,
        ?int $homeTeamGoals,
        ?int $awayTeamGoals,
        ?string $updatedDtm = null,
        )
    {
        $this->homeTeam = $homeTeam;
        $this->awayTeam = $awayTeam;
        $this->kickoff = $kickoff;
        $this->homeTeamGoals = $homeTeamGoals;
        $this->awayTeamGoals = $awayTeamGoals;
        $this->updatedDtm = $updatedDtm;
    }

    public function setId($id) {
        $this->matches2Id = $id;
    }
}
