import "./App.css";
import type { Choice, ChoiceDetails, Result } from "./types/game";
import { choices, resultCopy } from "./constants/game";
import { getComputerChoice, getRoundResult } from "./lib/gameEngine";
import { useState } from "react";

function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  function playRound(choice: Choice) {
    setPlayerChoice(choice);
    const computer = getComputerChoice();
    setComputerChoice(computer);
    const roundResult = getRoundResult(choice, computer);
    setResult(roundResult);
  }
  return (
    <>
      <div className="title">Rock Paper Scissors</div>
      <div className="game">
        <div className="card">
          <article className="fighter-card">
            <div className="fighter-heading"> YOUR MOVE </div>
            <div className="fighter-image">
              <img src={playerChoice ? choices[playerChoice].image : "/mystery.svg"} />
            </div>
            <strong className="choice-label">{playerChoice ? choices[playerChoice].label : ""}</strong>
          </article>
          <article className="fighter-card">
            <div className="fighter-heading"> COMPUTER </div>
            <div className="fighter-image">
              <img src={computerChoice ? choices[computerChoice].image : "/mystery.svg"} />
            </div>
            <strong className="choice-label">{computerChoice ? choices[computerChoice].label : ""}</strong>
          </article>
        </div>
      </div>
      <div className="selection">
        <p> SELECT YOUR WEAPON</p>
        <div className="selection-buttons">
          {(Object.entries(choices) as [Choice, ChoiceDetails][]).map(([key, choice]) => (
            <button
              className={`choice-button ${playerChoice === key ? "selected" : ""}`}
              type="button"
              key={key}
              onClick={() => {
                playRound(key);
              }}
            >
              <span className="key-hint">{choice.shortcut}</span>
              <img src={choice.image} />
              <strong className="choice-label">{choice.label}</strong>
            </button>
          ))}
        </div>
      </div>
      <div className="result">
        {result && (
          <>
            <strong> {resultCopy[result].title}</strong>
            <p>{resultCopy[result].description}</p>
          </>
        )}
      </div>
      <footer className="footer">
        <p>Made by Shiba</p>
      </footer>
    </>
  );
}

export default App;
