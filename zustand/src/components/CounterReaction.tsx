type CounterReactionProps = {
  count: number;
};

function CounterReaction({ count }: CounterReactionProps) {
  const reaction =
    count >= 20
      ? { emoji: "😵", message: "거의 기절 직전이에요!", level: "faint" }
      : count >= 15
        ? { emoji: "😵‍💫", message: "너무 빨라서 어질어질해요!", level: "dizzy" }
        : count >= 10
          ? { emoji: "😲", message: "벌써 두 자릿수예요!", level: "surprised" }
          : count >= 5
            ? { emoji: "😄", message: "점점 신나는데요?", level: "happy" }
            : null;

  if (!reaction) {
    return null;
  }

  return (
    <div className={`counter-reaction reaction-${reaction.level}`} role="status" aria-live="polite">
      <span className="reaction-face" aria-hidden="true">
        {reaction.emoji}
      </span>
      <p>{reaction.message}</p>
    </div>
  );
}

export default CounterReaction;
