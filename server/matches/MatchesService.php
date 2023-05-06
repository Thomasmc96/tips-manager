<?php
include_once dirname(__DIR__) . '/config/Cors.php';
include_once dirname(__DIR__) . '/config/DatabaseService.php';
include_once __DIR__ . '/MatchesRepository.php';

class MatchesService
{
    public function getLimited(int $limit) {
        $matchesRepo = new MatchesRepository();
        $matches = $matchesRepo->getLatest();
        $matchesData = json_decode($matches['data']);

        $limitedMatches = [];
        for ($i=0; $i < $limit ; $i++) { 
            $limitedMatches[] = $matchesData[$i];
        }

        $matches['data'] = json_encode($limitedMatches);

        return $matches;
    }
}