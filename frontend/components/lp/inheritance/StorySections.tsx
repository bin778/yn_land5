import { PROBLEMS, QUOTES } from '@/data/content';

export function StoryIntroSection() {
  return (
    <section className="section story-intro" id="story">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Story 01</div>
          <h2>
            어느 날, 가족이
            <br />
            ‘상속인’이 되었습니다.
          </h2>
          <p className="lead">
            같은 부모, 같은 가족이어도 상속이 시작되는 순간 각자가 기억하는 시간과 기여는 달라집니다.
          </p>
        </div>
        <div className="quote-grid">
          {QUOTES.map(quote => (
            <article key={quote.tag} className="quote-card reveal">
              <p>{quote.text}</p>
              <small>{quote.tag}</small>
            </article>
          ))}
        </div>
        <p className="story-line reveal">
          상속은 돈의 문제이기 전에, <b>가족의 기억과 기대가 처음 숫자로 부딪히는 순간</b>입니다.
        </p>
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
            갈등이 커지는 이유는
            <br />
            대부분 비슷합니다.
          </h2>
          <p className="lead">
            처음부터 소송을 원하는 가족은 많지 않습니다. 다만 정확히 모르는 상태에서 대화를 시작하면 감정이 먼저
            커집니다.
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
      </div>
    </section>
  );
}
