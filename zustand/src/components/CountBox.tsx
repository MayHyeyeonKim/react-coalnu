import countStore from "../../stores/counterStore";
import CelebrationNotice from "./CelebrationNotice";
import CounterReaction from "./CounterReaction";
import WarningNotice from "./WarningNotice";

function CountBox() {
  const { count, blockedAttempts, increase, decrease, increaseBy } = countStore();

  return (
    <main className="counter-card">
      <p className="counter-label">Zustand counter</p>
      {count > 29 ? <CelebrationNotice count={count} /> : <h1 className="counter-value">{count}</h1>}

      <div className="counter-actions">
        <button type="button" onClick={decrease} aria-label="Decrease count">
          −
        </button>
        <button type="button" onClick={increase} aria-label="Increase count">
          +
        </button>
        <button type="button" className="button-wide" onClick={() => increaseBy(10)}>
          Add 10
        </button>
      </div>

      <div className="feedback-area">
        <CounterReaction count={count} />
        {blockedAttempts > 0 && <WarningNotice key={blockedAttempts} />}
      </div>
    </main>
  );
}

export default CountBox;
