import { useState } from "react";
import type { Choice, Result } from "../types/game";
import { getComputerChoice, getRoundResult } from "../lib/gameEngine";

export function useGame() {

    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
    const [result, setResult] = useState<Result | null>(null);

    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);

    const isGameOver = playerScore >= 5 || computerScore >= 5;

    function playRound(choice: Choice) {
        if (isGameOver) {
            return;
        }

        setPlayerChoice(choice);

        const computer = getComputerChoice();
        setComputerChoice(computer);

        const roundResult = getRoundResult(choice, computer);
        setResult(roundResult);

        updateScores(roundResult);
    }

    function updateScores(roundResult: Result) {
        if (roundResult === "win") {
            setPlayerScore((prevScore) => prevScore + 1);
        } else if (roundResult === "lose") {
            setComputerScore((prevScore) => prevScore + 1);
        }
    }

    function resetMatch() {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setPlayerScore(0);
        setComputerScore(0);
    }


    return {
        playerChoice,
        computerChoice,
        result,
        playerScore,
        computerScore,
        isGameOver,
        playRound,
        resetMatch,
    }
}