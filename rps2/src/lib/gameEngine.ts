import type { Choice, Result } from "../types/game";

export const beats: Record<Choice, Choice> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

export function getRoundResult(playerChoice: Choice, computerChoice: Choice): Result {
    if (playerChoice === computerChoice) {
        return "draw";
    } else if (beats[playerChoice] === computerChoice) {
        return "win";
    } else {
        return "lose";
    }
}

export function getComputerChoice(): Choice {
    const choices: Choice[] = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}