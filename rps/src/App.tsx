import { useCallback, useEffect, useState } from "react";
import "./App.css";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw";

type ChoiceDetails = {
  label: string;
  image: string;
  shortcut: string;
};

type Round = {
  id: number;
  player: Choice;
  computer: Choice;
  result: Result;
};

const choices: Record<Choice, ChoiceDetails> = {
  rock: { label: "바위", image: "/rock.svg", shortcut: "R" },
  paper: { label: "보", image: "/paper.svg", shortcut: "P" },
  scissors: { label: "가위", image: "/scissors.svg", shortcut: "S" },
};

const resultCopy: Record<Result, { title: string; message: string }> = {
  win: { title: "YOU WIN", message: "완벽한 선택이에요!" },
  lose: { title: "CPU WINS", message: "다음 수로 반격해 보세요." },
  draw: { title: "DRAW", message: "생각이 통했네요. 다시 한 번!" },
};

const winningChoice: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getRoundResult(player: Choice, computer: Choice): Result {
  if (player === computer) return "draw";
  return winningChoice[player] === computer ? "win" : "lose";
}

function getComputerChoice(): Choice {
  const options = Object.keys(choices) as Choice[];
  return options[Math.floor(Math.random() * options.length)];
}

function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<Round[]>([]);

  const matchWinner = playerScore >= 5 ? "player" : computerScore >= 5 ? "computer" : null;

  const playRound = useCallback(
    (choice: Choice) => {
      if (matchWinner) return;

      const cpuChoice = getComputerChoice();
      const roundResult = getRoundResult(choice, cpuChoice);

      setPlayerChoice(choice);
      setComputerChoice(cpuChoice);
      setResult(roundResult);
      setHistory((current) =>
        [{ id: Date.now(), player: choice, computer: cpuChoice, result: roundResult }, ...current].slice(0, 5),
      );

      if (roundResult === "win") {
        setPlayerScore((score) => score + 1);
        setStreak((count) => count + 1);
      } else if (roundResult === "lose") {
        setComputerScore((score) => score + 1);
        setStreak(0);
      }
    },
    [matchWinner],
  );

  useEffect(() => {
    const shortcuts: Record<string, Choice> = {
      r: "rock",
      p: "paper",
      s: "scissors",
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const choice = shortcuts[event.key.toLowerCase()];
      if (choice) playRound(choice);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playRound]);

  const resetMatch = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setStreak(0);
    setHistory([]);
  };

  const resultTitle = matchWinner
    ? matchWinner === "player"
      ? "MATCH WON"
      : "MATCH LOST"
    : result
      ? resultCopy[result].title
      : "CHOOSE YOUR MOVE";

  const resultMessage = matchWinner
    ? matchWinner === "player"
      ? "최종 승리! 새로운 매치에 도전해 보세요."
      : "CPU가 먼저 5점에 도달했어요. 재도전할까요?"
    : result
      ? resultCopy[result].message
      : "먼저 5점을 얻으면 매치에서 승리합니다.";

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="game" aria-labelledby="game-title">
        <header className="game-header">
          <div>
            <p className="eyebrow">MIND vs MACHINE</p>
            <h1 id="game-title">
              RPS <span>ARENA</span>
            </h1>
            <p className="subtitle">가위바위보, 하지만 조금 더 치열하게.</p>
          </div>
          <button className="reset-button" type="button" onClick={resetMatch}>
            <span aria-hidden="true">↻</span> RESET
          </button>
        </header>

        <div className="scoreboard" aria-label="현재 점수">
          <div className="score score-player">
            <span>YOU</span>
            <strong>{playerScore}</strong>
          </div>
          <div className="score-center">
            <span className="round-label">FIRST TO 5</span>
            <div className="score-divider">
              <i />
              <span>VS</span>
              <i />
            </div>
            <span className="streak">🔥 {streak} WIN STREAK</span>
          </div>
          <div className="score score-computer">
            <span>CPU</span>
            <strong>{computerScore}</strong>
          </div>
        </div>

        <section className="arena" aria-label="선택 결과">
          <article className={`fighter-card player-card ${result === "win" ? "winner" : ""}`}>
            <div className="card-heading">
              <span className="player-dot" />
              <p>YOUR MOVE</p>
            </div>
            <div className="image-stage">
              <span className="orbit" />
              <img
                src={playerChoice ? choices[playerChoice].image : "/mystery.svg"}
                alt={playerChoice ? `나의 선택: ${choices[playerChoice].label}` : "게임 시작 전 대기 이미지"}
              />
            </div>
            <strong className="choice-name">{playerChoice ? choices[playerChoice].label : "READY?"}</strong>
          </article>

          <div className={`result-panel ${result ? `result-${result}` : ""}`} aria-live="polite">
            <span className="result-line" />
            <strong>{resultTitle}</strong>
            <p>{resultMessage}</p>
            <span className="result-line" />
          </div>

          <article className={`fighter-card computer-card ${result === "lose" ? "winner" : ""}`}>
            <div className="card-heading">
              <span className="computer-dot" />
              <p>CPU MOVE</p>
            </div>
            <div className="image-stage">
              <span className="orbit" />
              <img
                src={computerChoice ? choices[computerChoice].image : "/mystery.svg"}
                alt={computerChoice ? `컴퓨터 선택: ${choices[computerChoice].label}` : "게임 시작 전 대기 이미지"}
              />
            </div>
            <strong className="choice-name">{computerChoice ? choices[computerChoice].label : "WAITING"}</strong>
          </article>
        </section>

        <section className="controls" aria-label="가위바위보 선택">
          <p>SELECT YOUR WEAPON</p>
          <div className="choice-buttons">
            {(Object.entries(choices) as [Choice, ChoiceDetails][]).map(([key, choice]) => (
              <button
                className={`choice-button ${playerChoice === key ? "selected" : ""}`}
                type="button"
                key={key}
                onClick={() => playRound(key)}
                disabled={Boolean(matchWinner)}
                aria-label={`${choice.label} 선택`}
              >
                <span className="key-hint">{choice.shortcut}</span>
                <img src={choice.image} alt="" />
                <strong>{choice.label}</strong>
              </button>
            ))}
          </div>
        </section>

        <footer className="history">
          <span>RECENT ROUNDS</span>
          <div className="history-list">
            {history.length === 0 ? (
              <p>첫 번째 수를 선택해 기록을 시작하세요.</p>
            ) : (
              history.map((round) => (
                <div className={`history-item ${round.result}`} key={round.id}>
                  <img src={choices[round.player].image} alt={choices[round.player].label} />
                  <span>{round.result === "win" ? "W" : round.result === "lose" ? "L" : "D"}</span>
                </div>
              ))
            )}
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;
