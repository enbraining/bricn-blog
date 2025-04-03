'use client';

import H3 from '../components/basic/H3';
import Hr from '../components/basic/Hr';
import LineTitle from '../components/basic/LineTitle';
import PortfolioMyself from '../components/profile/Myself';

export default function Page() {
  return (
    <div>
      <section className="h-screen grid border-b">
        <div className="my-auto grid gap-y-5 items-start">
          <PortfolioMyself />
        </div>
      </section>

      <section className="h-screen grid border-b">
        <div className="mt-12">
          <H3>Certificates</H3>
          <Hr />
          <div className="grid gap-y-2">
            <LineTitle
              content="전자산업기사"
              date="2024년 4차 과정평가형자격 합격"
            />
            <LineTitle content="영어" date="단순한 대화 가능" />
          </div>
        </div>
      </section>

      {/* <div className="mt-12">
        <div className="grid gap-y-3">
          <p>
            처음으로 프로그래밍을 배우기 시작하면서 스프링으로 입문하여 필요에
            따라 QueryDSL, Spring Batch 등의 기술을 추가적으로 익혔으며, 그 후
            타입스크립트 공부를 시작, 토이 프로젝트에서 Nest.js + Next.js 풀스택
            개발을 하였습니다.
          </p>
          <p>
            광주소프트웨어마이스터고등학교에서 동아리 맛소금의 부장으로
            참여하여, 후배들과의 커뮤니케이션을 위해서 노력하고, 문서화를 통해
            진행중인 프로젝트를 쉽게 인수인계할 수 있도록 하였습니다. 또한 링크
            행사에 참여해서 다른 마이스터고 동아리와의 커뮤니케이션을
            진행했습니다.
          </p>
        </div>
      </div> */}
    </div>
  );
}
