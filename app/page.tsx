'use client';

import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <section className="font-bold text-xl text-neutral-400">
        <div className="mt-8">
          <p>
            안녕하세요, 개발자 <a className="text-neutral-600">김동학</a>입니다.
          </p>
          <p>
            저는 <a className="text-neutral-600">다양한 분야</a>에서 새로운 것을
            시도해보기를 즐깁니다.
          </p>
        </div>
        <Image
          src={'/images/mc_fnd.png'}
          alt="mc_fnd"
          width={1600}
          height={900}
          priority={true}
          className="mt-8 w-fit rounded-sm aspect-video object-cover"
        />
        <hr className="border-neutral-200 my-8" />
      </section>

      <section className="font-bold text-xl text-neutral-400">
        <p>Postgres, React, Kotlin, Spring Framework</p>
        <p>
          다양한 프레임워크, 애플리케이션에 대해서, 빠르게{' '}
          <a className="text-neutral-600">
            이해하고 프로젝트에 적용할 수 있습니다.
          </a>
        </p>
        <hr className="border-neutral-200 my-8" />
      </section>

      <section className="font-bold text-xl text-neutral-400">
        <p>
          AVR 계열의 <a className="text-neutral-600">ATmega128</a>을 주로
          사용하며,
        </p>
        <p>
          <a className="text-neutral-600">외부 인터럽트</a>,{' '}
          <a className="text-neutral-600">T/C</a> 등의 내장 기능을 이용해서,
          원하는 기능을 구현할 수 있습니다.
        </p>
        <hr className="border-neutral-200 my-8" />
      </section>

      <section className="font-bold text-xl text-neutral-400">
        <p>
          무선통신에 흥미가 있고, 시간적인 여유만 생긴다면 아마추어무선기사를
          공부할 예정입니다.
        </p>
        <hr className="border-neutral-200 my-8" />
      </section>

      <section className="font-bold text-xl text-neutral-400 w-fit">
        <p>사물놀이를 비롯한 아름다운 소리, 음악 등을 좋아합니다.</p>
        <iframe
          className="mt-4 w-full aspect-video"
          src="https://www.youtube.com/embed/J-V7cUvkX3s?si=aLy6zIJ6iJkO1laR"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}
