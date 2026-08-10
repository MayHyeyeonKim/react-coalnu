import type { Choice, ChoiceDetails, Result } from "../types/game";

export const choices: Record<Choice, ChoiceDetails> = {
    rock: { label: "Rock", image: "/shiba-rock.png", shortcut: "r" },
    paper: { label: "Paper", image: "/shiba-paper.png", shortcut: "p" },
    scissors: { label: "Scissors", image: "/shiba-scissors.png", shortcut: "s" },
};

export const resultCopy: Record<Result, { title: string; description: string }> = {
    win: { title: "You Win!", description: "Congratulations, you won!" },
    lose: { title: "You Lose!", description: "Better luck next time!" },
    draw: { title: "It's a Draw!", description: "No one wins this round." },
};
