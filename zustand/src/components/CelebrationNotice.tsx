type CelebrationNoticeProps = {
  count: number;
};

function CelebrationNotice({ count }: CelebrationNoticeProps) {
  return (
    <section className="celebration" role="status" aria-label="Count celebration">
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <span className="balloon balloon-left" aria-hidden="true">
        🎈
      </span>
      <h1 className="counter-value celebration-value">{count}</h1>
      <span className="balloon balloon-right" aria-hidden="true">
        🎈
      </span>

      <p className="celebration-message">You made it past 30!</p>
    </section>
  );
}

export default CelebrationNotice;
