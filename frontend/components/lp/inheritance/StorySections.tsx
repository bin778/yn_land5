import { PROBLEMS, QUOTES, TIME_POINTS } from '@/data/content';

export function StoryIntroSection() {
  return (
    <section className="section story-intro" id="story">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Story 01</div>
          <h2>
            같은 가족이어도,
            <br />
            상속이 시작되면 생각은 달라집니다.
          </h2>
          <p className="lead">부모님이 남긴 재산은 하나지만, 그것을 바라보는 가족들의 기억과 기준은 같지 않습니다.</p>
        </div>
        <div className="quote-grid">
          {QUOTES.map(quote => (
            <article key={quote.tag} className="quote-card reveal">
              <p>{quote.text}</p>
              <small>{quote.tag}</small>
            </article>
          ))}
        </div>
        <blockquote className="story-highlight reveal">
          <p className="story-highlight-quote">“상속에 있어 추억은 결국 숫자로 계산됩니다.”</p>
          <p className="story-highlight-body">
            누가 부모님을 얼마나 돌봤는지, 누가 생전에 무엇을 받았는지, 누구에게 어떤 약속이 있었는지. 가족에게는
            기억이지만 상속분쟁에서는 결국 자료와 법적 기준으로 확인됩니다.
          </p>
        </blockquote>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="section problem">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Story 02</div>
          <h2>
            감정이 깊어질수록,
            <br />
            권리도 지키기 어려워질 수 있습니다.
          </h2>
          <p className="lead">
            처음부터 가족 간 소송을 원하는 사람은 많지 않습니다. 하지만 상속절차를 정확히 모르는 상태에서 대화를
            시작하면 감정이 먼저 커질 수 있습니다.
          </p>
        </div>
        <div className="problem-grid">
          {PROBLEMS.map(item => (
            <article key={item.title} className="problem-card reveal">
              <div className="problem-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="story-line reveal">
          문제는 그때는 이미 <b>처음보다 해결할 수 있는 선택지가 줄어들 수 있다는 것</b>입니다.
        </p>
      </div>
    </section>
  );
}

export function TimeProtectionSection() {
  return (
    <section className="section time-protection" id="protect">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Story 03</div>
          <h2>
            권리를 지키는 데에도
            <br />
            확인해야 할 시간이 있습니다.
          </h2>
          <p className="lead">
            소송을 빨리 시작하라는 뜻이 아닙니다. 내 권리를 지키기 위해 무엇을 언제 확인해야 하는지 아는 것이
            먼저입니다.
          </p>
        </div>

        <div className="time-protection-grid">
          <div className="time-panel reveal">
            <div className="time-number">03</div>
            <h3>시간은 상속분쟁의 중요한 변수입니다.</h3>
            <p>
              상속포기·한정승인처럼 법에서 정한 기간을 확인해야 하는 절차가 있고, 시간이 오래 지나면
              계좌내역·증여자료·가족 간 대화 등 사실관계를 확인할 자료를 확보하기 어려워질 수 있습니다.
            </p>
          </div>

          <div className="time-points">
            {TIME_POINTS.map(point => (
              <div key={point.title} className="time-point reveal">
                <b>{point.title}</b>
                <span>{point.body}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
