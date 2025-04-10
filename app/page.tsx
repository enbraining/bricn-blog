'use client';

import Image from 'next/image';
import { config } from './config';

export default function Page() {
  return (
    <div>
      <section>
        <div className="font-bold text-2xl mt-20">
          <h1>
            안녕하세요, 개발자 <a className="text-blue-500">김동학</a>입니다.
          </h1>
          <h1>
            저는 <a className="text-blue-500">다양한 분야</a>에서 새로운 것을
            시도해보기를 즐깁니다.
          </h1>
        </div>
        <Image
          src={'/images/mc_fnd.png'}
          alt="mc_fnd"
          width={1600}
          height={900}
          priority={true}
          className="mt-8 w-fit rounded-sm aspect-video object-cover"
        />
      </section>

      <section className="mt-20">
        <div className="font-bold text-2xl">
          <p>
            다양한 프레임워크, 애플리케이션의{' '}
            <a className="text-blue-500">구조를</a>
          </p>
          <p>
            <a className="text-blue-500">빠르게 이해하고</a> 프로젝트에 적용할
            수 있습니다.
          </p>
        </div>
        <div className="mt-8 gap-x-4 overflow-x-scroll grid grid-flow-col">
          {config.projects.map((project) => (
            <div
              key={project.title}
              className="py-6 px-8 border rounded-lg w-[23rem]"
            >
              <h1 className="font-semibold text-lg">{project.title}</h1>
              <p className="break-words max-w-[260px]">{project.description}</p>
              <div className="gap-1 mt-3 flex flex-wrap">
                {project.stacks.map((stack) => (
                  <p
                    className="bg-neutral-200 font-semibold text-xs py-1 px-2 rounded-full"
                    key={stack}
                  >
                    {stack}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="font-bold text-2xl mt-20">
        <p>
          AVR 계열의 <a className="text-blue-500">ATmega128</a>을 주로 사용하며,
        </p>
        <p>
          <a className="text-blue-500">외부 인터럽트</a>,{' '}
          <a className="text-blue-500">T/C</a> 등의 내장 기능을 이용해서, 원하는
          기능을 구현할 수 있습니다.
        </p>
        <hr className="border-neutral-200 my-8" />
      </section>
    </div>
  );
}
