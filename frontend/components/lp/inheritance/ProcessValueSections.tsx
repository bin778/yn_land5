import { PROCESS_STEPS, VALUE_CARDS } from '@/data/content';

export function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Story 03</div>
          <h2>
            여온은 문제를
            <br />
            순서대로 정리합니다.
          </h2>
          <p className="lead">
            상속은 단순히 “누가 몇 퍼센트를 받는가”의 계산이 아니라, 사람과 시간과 재산의 흐름을 다시 맞추는 과정입니다.
          </p>
        </div>
        <div className="process-grid">
          {PROCESS_STEPS.map(step => (
            <div key={step.title} className="process-step reveal">
              <div className="process-icon">{step.icon}</div>
              <strong>{step.title}</strong>
              <span>{step.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValueSection() {
  return (
    <section className="section value-section">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">What Must Be Checked</div>
          <h2>상속은 단순한 계산이 아닙니다.</h2>
          <p className="lead">네 가지 핵심 포인트를 먼저 확인하면 감정의 언어를 법적 판단의 언어로 바꿀 수 있습니다.</p>
        </div>
        <div className="value-grid">
          {VALUE_CARDS.map(card => (
            <article key={card.num} className="value-card glass reveal">
              <div className="num">{card.num}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
