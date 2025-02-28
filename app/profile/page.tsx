'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Hr from '../components/basic/Hr';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="grid">
      <section className="flex mb-6">
        <div className="mx-auto flex gap-x-4 text-neutral-700">
          <Link href={'https://github.com/enbraining'}>
            <IconBrandGithub size={30} />
          </Link>
          <Link href={'https://linkedin.com/in/enbraining'}>
            <IconBrandLinkedin size={30} />
          </Link>
          <Link href={'https://youtube.com/@enbraining'}>
            <IconBrandYoutube size={30} />
          </Link>
        </div>
      </section>

      <Hr />

      <section className="grid gap-y-2">
        <p>
          안녕하세요, 저에 대해서 상세한 정보를 원하시면 포트폴리오를 보시는
          것을 추천드릴게요.
        </p>
        <p>
          저는 다양한 분야에서 새로운 것을 시도해보는 것을 좋아합니다. 홈 서버를
          직접 다루고, 블로그도 직접 구축해보고, AVR과 ESP 프로그래밍을 통해서
          직접 임베디드 장비를 작동시키는 것 등..
        </p>
        <p>나중에 마저 쓸거에요</p>
      </section>
    </div>
  );
}
