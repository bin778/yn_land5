import { PROCESS_STEPS, SOLUTIONS, VALUE_CARDS } from '@/data/content';

export function ProcessSection() {
  return (
    <section className="section protection-method" id="process">
      <div className="wrap">
        <div className="center">
          <h2>
            권리는 지키고,
            <br />
            관계는 남을 수 있도록
          </h2>
          <p className="lead">
            상속분쟁의 해결이 반드시 판결문이어야 하는 것은 아닙니다. 의뢰인의 권리를 충분히 보호하면서 분쟁 이후에 가족
            관계까지 고려한 해결을 찾습니다.
          </p>
        </div>

        <div className="protection-method-grid">
          <div className="protection-core">
            <span>PROTECT FIRST</span>
            <strong>
              권리를 먼저
              <br />
              보호합니다.
            </strong>
            <p>
              그 다음 협의, 조정, 심판, 소송 중 현재 사건에 맞는 방법을 선택합니다. 가족관계를 불필요하게 더 악화시키지
              않을 수 있다면, 그것 역시 좋은 해결의 일부라고 생각합니다.
            </p>
          </div>

          <div className="solution-list">
            {SOLUTIONS.map(solution => (
              <div key={solution.title} className="solution">
                <b>{solution.title}</b>
                <span>{solution.body}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="process-grid protection-process">
          {PROCESS_STEPS.map(step => (
            <div key={step.title} className="process-step">
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
        <div className="center">
          <div className="kicker">What Must Be Checked</div>
          <h2>상속분쟁에서 권리를 지키려면</h2>
          <h2>네 가지를 먼저 확인해야 합니다.</h2>
          <p className="lead">무엇을 주장할지보다 먼저, 어떤 재산과 사실이 내 권리에 영향을 주는지 확인합니다.</p>
        </div>
        <div className="value-grid">
          {VALUE_CARDS.map(card => (
            <article key={card.num} className="value-card glass">
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
