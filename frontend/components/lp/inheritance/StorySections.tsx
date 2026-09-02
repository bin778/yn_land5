import { TIME_POINTS } from '@/data/content';
import { renderTextSegments } from '@/lib/renderTextSegments';
import { ProblemCarousel } from './ProblemCarousel';
import { QuoteCarousel } from './QuoteCarousel';

export function StoryIntroSection() {
  return (
    <section className="section story-intro" id="story">
      <div className="wrap">
        <div className="center">
          <div className="kicker">Story 01</div>
          <h2>
            같은 가족이어도,
            <br />
            생각은 모두 다릅니다
          </h2>
          <p className="lead">
            부모님이 남긴 재산, 그것을 바라보는 <br className="br-mobile" /> 가족들의 기억과 기준은 같지 않습니다.
          </p>
        </div>
        <QuoteCarousel />
        <blockquote className="story-highlight">
          <p className="story-highlight-quote">
            “상속에 있어 추억은 <br className="br-mobile" /> 숫자로 계산됩니다”
          </p>
          <p className="story-highlight-body">
            누가 부모님을 얼마나 돌봤는지, 누가 생전에 무엇을 받았는지, <br className="br-desktop" /> 누구에게 어떤
            약속이 있었는지, <br className="br-mobile" /> 가족에게는 기억이지만 상속분쟁에서는 결국 자료와 법적 기준으로
            확인됩니다.
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
        <div className="center">
          <div className="kicker">Story 02</div>
          <h2>
            감정이 깊어질수록,
            <br />
            멀어지는 권리
          </h2>
          <p className="lead">
            처음부터 가족 간 소송을 원하는 사람은 많지 않습니다. <br className="br-mobile" /> 하지만 상속절차를{' '}
            <br className="br-desktop" /> 정확히 모르는 상태에서{` `}
            <br className="br-mobile" />
            대화를 시작하면 감정이 먼저 커질 수 있습니다.
          </p>
        </div>
        <ProblemCarousel />
      </div>
    </section>
  );
}

export function TimeProtectionSection() {
  return (
    <section className="section time-protection" id="protect">
      <div className="wrap">
        <div className="center">
          <div className="kicker">Story 03</div>
          <h2>
            권리를 지키는 데에도
            <br />
            법정 기간은 정해져 있습니다
          </h2>
          <p className="lead">
            소송을 빨리 시작하라는 뜻이 아닙니다. <br /> 내 권리를 지키기 위해 무엇을 언제 확인해야 하는지{` `}
            <br className="br-mobile" />
            아는 것이 먼저입니다.
          </p>
        </div>

        <div className="time-protection-grid">
          <div className="time-panel">
            <h3>
              시간은 상속분쟁의 <br className="br-mobile" />
              중요한 변수입니다
            </h3>
            <p>
              상속포기·한정승인처럼 법에서 정한 기간을 확인해야 하는 절차가 있고, 시간이 오래 지나면
              계좌내역·증여자료·가족 간 대화 등 사실관계를 확인할 자료를 확보하기 어려워질 수 있습니다.
            </p>
          </div>

          <div className="time-points">
            {TIME_POINTS.map(point => (
              <div key={point.title} className="time-point">
                <b>{point.title}</b>
                <span>{renderTextSegments(point.body)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
