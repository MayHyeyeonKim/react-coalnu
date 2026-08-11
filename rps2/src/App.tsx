import "./App.css";
import type { Choice, ChoiceDetails } from "./types/game";
import { choices, resultCopy } from "./constants/game";
import { useGame } from "./hooks/useGame";

function App() {
  const { playerChoice, computerChoice, result, playerScore, computerScore, isGameOver, playRound, resetMatch } =
    useGame();

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />

      <div className="game-container">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">
            <span>柴</span>
          </div>
          <div className="hero-copy">
            <div className="eyebrow"><i /> SHIBA BATTLE CLUB</div>
            <h1 className="title">Rock Paper <span>Scissors</span></h1>
            <p>Trust your instinct. Pick your Shiba. Own the arena.</p>
          </div>
          <button className="reset-button" type="button" onClick={resetMatch}>
            <span aria-hidden="true">↻</span>
            Reset match
          </button>
        </header>

        <section className="scoreboard" aria-label="Match score">
          <div className="score score-player">
            <div>
              <span className="score-name">YOU</span>
              <small>PLAYER ONE</small>
            </div>
            <strong>{playerScore}</strong>
          </div>

          <div className="score-status">
            <span>FIRST TO 5</span>
            <div className="score-rule"><i /><b>VS</b><i /></div>
            <small>BEST SHIBA WINS</small>
          </div>

          <div className="score score-computer">
            <strong>{computerScore}</strong>
            <div>
              <span className="score-name">CPU</span>
              <small>SHIBA BOT</small>
            </div>
          </div>
        </section>

        <section className="game" aria-label="Rock paper scissors arena">
          <div className="card">
            <article className={`fighter-card player-fighter ${result === "win" ? "round-winner" : ""}`}>
              <div className="fighter-heading">
                <span className="fighter-dot" />
                YOUR MOVE
              </div>
              <div className="fighter-image">
                <span className="image-orbit" aria-hidden="true" />
                <img
                  src={playerChoice ? choices[playerChoice].image : "/mystery.svg"}
                  alt={playerChoice ? `Your choice: ${choices[playerChoice].label}` : "Shiba waiting for your choice"}
                />
              </div>
              <strong className="fighter-choice">{playerChoice ? choices[playerChoice].label : "Ready?"}</strong>
              <span className="fighter-caption">THE CHALLENGER</span>
            </article>

            <div className={`result ${result ? `result-${result}` : ""}`} aria-live="polite">
              {isGameOver ? (
                <>
                  <div className="modal-overlay">
                    <div className="result-modal" role="dialog" aria-modal="true" aria-labelledby="match-result">
                      <span className="modal-badge">MATCH COMPLETE</span>
                      <strong id="match-result">
                        {playerScore > computerScore ? "You own the arena!" : "The Shiba bot wins!"}
                      </strong>
                      <p className="modal-score">
                        <span>{playerScore}</span><b>—</b><span>{computerScore}</span>
                      </p>
                      <p>{playerScore > computerScore ? "A legendary performance." : "Good fight. Ready for revenge?"}</p>
                      <button type="button" onClick={resetMatch}>
                        <span aria-hidden="true">↻</span> Play again
                      </button>
                    </div>
                  </div>
                  <strong>{playerScore > computerScore ? "Victory" : "Defeat"}</strong>
                </>
              ) : result ? (
                <>
                  <span className="result-kicker">ROUND RESULT</span>
                  <strong>{resultCopy[result].title}</strong>
                  <p>{resultCopy[result].description}</p>
                </>
              ) : (
                <>
                  <span className="versus">VS</span>
                  <p>Choose your<br />first move</p>
                </>
              )}
            </div>

            <article className={`fighter-card computer-fighter ${result === "lose" ? "round-winner" : ""}`}>
              <div className="fighter-heading">
                <span className="fighter-dot" />
                CPU MOVE
              </div>
              <div className="fighter-image cpu-image">
                <span className="image-orbit" aria-hidden="true" />
                <img
                  src={computerChoice ? choices[computerChoice].image : "/mystery.svg"}
                  alt={computerChoice ? `Computer choice: ${choices[computerChoice].label}` : "Computer Shiba waiting"}
                />
              </div>
              <strong className="fighter-choice">{computerChoice ? choices[computerChoice].label : "Waiting"}</strong>
              <span className="fighter-caption">THE MACHINE</span>
            </article>
          </div>
        </section>

        <section className="selection" aria-labelledby="selection-title">
          <div className="selection-heading">
            <span>CHOOSE YOUR CHAMPION</span>
            <h2 id="selection-title">Select your weapon</h2>
            <p>Pick the Shiba you trust. First to five wins.</p>
          </div>
          <div className="selection-buttons">
            {(Object.entries(choices) as [Choice, ChoiceDetails][]).map(([key, choice]) => (
              <button
                className={`choice-button ${playerChoice === key ? "selected" : ""}`}
                type="button"
                disabled={isGameOver}
                key={key}
                aria-label={`Choose ${choice.label}`}
                aria-pressed={playerChoice === key}
                onClick={() => playRound(key)}
              >
                <span className="key-hint">{choice.shortcut.toUpperCase()}</span>
                <span className="selected-mark" aria-hidden="true">✓</span>
                <span className="choice-image-wrap">
                  <img src={choice.image} alt="" />
                </span>
                <strong className="choice-label">{choice.label}</strong>
                <span className="choice-action">Choose</span>
              </button>
            ))}
          </div>
        </section>

        <footer className="footer">
          <span>✦</span>
          <p>Made with courage by Shiba</p>
          <span>✦</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
