/* eslint-disable @next/next/no-img-element */
import { LAWYERS } from '@/data/content';
import { assetPath } from '@/lib/asset-path';

export function LawyersSection() {
  return (
    <section className="section lawyers" id="lawyers">
      <div className="wrap">
        <div className="center reveal">
          <div className="kicker">Lawyers of Yeon</div>
          <h2>
            이야기를 끝까지 듣는
            <br />
            변호사들입니다.
          </h2>
          <p className="lead">
            상속 문제의 출발점은 서류보다 사람입니다. 실제 상담을 맡는 법무법인 여온 변호사들이 현재 상황부터 차분히
            확인합니다.
          </p>
        </div>
        <div className="lawyer-grid">
          {LAWYERS.map(lawyer => (
            <article key={lawyer.name} className="lawyer-card reveal">
              <div className="lawyer-photo">
                <img src={assetPath(lawyer.image)} alt={lawyer.name} />
              </div>
              <div className="lawyer-info">
                <div className="lawyer-name">{lawyer.name}</div>
                <p>{lawyer.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="team-note reveal">
          ※ 실제 사건 담당 변호사는 사건의 성격과 일정 등에 따라 달라질 수 있습니다.
        </div>
      </div>
    </section>
  );
}
