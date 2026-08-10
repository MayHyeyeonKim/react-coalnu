import "./App.css";
import type { Choice, ChoiceDetails, Result } from "./types/game";
import { choices, resultCopy } from "./constants/game";

function App() {
  return (
    <>
      <div className="title">Rock Paper Scissors</div>
      <div className="game">
        <div className="card"></div>
      </div>
      <div className="result"></div>
      <footer className="footer">
        <p>Made by Shiba</p>
      </footer>
    </>
  );
}

export default App;
