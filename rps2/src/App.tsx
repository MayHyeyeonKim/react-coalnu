import "./App.css";
import type { Choice, ChoiceDetails } from "./types/game";
import { choices, resultCopy } from "./constants/game";
import { useGame } from "./hooks/useGame";

function App() {
  const { playerChoice, computerChoice, result, playerScore, computerScore, isGameOver, playRound, resetMatch } =
    useGame();

  return (
    <>
      <div className="title">Rock Paper Scissors</div>

      {/* counting and reset buttons */}
      <div className="counting-reset-area">
        <button
          className="reset-button"
          type="button"
          onClick={() => {
            resetMatch();
          }}
        >
          Reset
        </button>
        <div className="counting">
          <p>You: {playerScore}</p>
          <p>Computer: {computerScore}</p>
        </div>
      </div>

      {/* playing card */}
      <div className="game">
        <div className="card">
          <article className="fighter-card">
            <div className="fighter-heading"> YOUR MOVE </div>
            <div className="fighter-image">
              <img src={playerChoice ? choices[playerChoice].image : "/mystery.svg"} />
            </div>
            <strong className="choice-label">{playerChoice ? choices[playerChoice].label : ""}</strong>
          </article>

          <div className="result">
            {isGameOver ? (
              <>
                <div className="modal-overlay">
                  <div className="result-modal" role="dialog">
                    <strong id="match-result">
                      {playerScore > computerScore ? "You won the match!" : "Computer won the match!"}
                    </strong>
                    <p>
                      {playerScore} : {computerScore}
                    </p>

                    <button type="button" onClick={resetMatch}>
                      Play Again
                    </button>
                  </div>
                </div>
                <strong>{playerScore > computerScore ? "You won the match!" : "Computer won the match!"}</strong>
              </>
            ) : (
              result && (
                <>
                  <strong> {resultCopy[result].title}</strong>
                  <p>{resultCopy[result].description}</p>
                </>
              )
            )}
          </div>

          <article className="fighter-card">
            <div className="fighter-heading"> COMPUTER </div>
            <div className="fighter-image">
              <img src={computerChoice ? choices[computerChoice].image : "/mystery.svg"} />
            </div>
            <strong className="choice-label">{computerChoice ? choices[computerChoice].label : ""}</strong>
          </article>
        </div>
      </div>

      {/* selection buttons */}
      <div className="selection">
        <p> SELECT YOUR WEAPON</p>
        <div className="selection-buttons">
          {(Object.entries(choices) as [Choice, ChoiceDetails][]).map(([key, choice]) => (
            <button
              className={`choice-button ${playerChoice === key ? "selected" : ""}`}
              type="button"
              disabled={isGameOver}
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

      <footer className="footer">
        <p>Made by Shiba</p>
      </footer>
    </>
  );
}

export default App;
