'use client';

import Image from 'next/image';
import { config } from './config';

export default function Page() {
  return (
    <div className="mb-20">
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
        <div className="flex mt-6 gap-x-2 overflow-x-auto whitespace-nowrap">
          {config.hobbies.map((hobby, index) => (
            <div
              key={index}
              className="rounded-full px-4 py-1 text-sm bg-neutral-100 border"
            >
              <p>{hobby}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-flow-col items-stretch gap-x-16 overflow-x-auto">
        <div className="mt-3">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="size-2 rounded-full bg-neutral-400" />
            </div>
            <div className="flex whitespace-nowrap leading-none gap-x-2">
              <p className="text-neutral-700 font-semibold">2017 ~ 2022</p>
              <p>가야금 연주</p>
            </div>
          </div>
          <div className="ml-[0.215rem] border-l h-8 border-neutral-300" />

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="size-2 rounded-full bg-neutral-400" />
            </div>
            <div className="flex whitespace-nowrap leading-none gap-x-2">
              <p className="text-neutral-700 font-semibold">2023</p>
              <p>광주소프트웨어마이스터고등학교 입학</p>
            </div>
          </div>
          <div className="ml-[0.215em] border-l h-8 border-neutral-300" />

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="size-2 rounded-full bg-neutral-400" />
            </div>
            <div className="flex whitespace-nowrap leading-none gap-x-2">
              <p className="text-neutral-700 font-semibold">2024</p>
              <p>전자산업기사 과정형평가 합격</p>
            </div>
          </div>
          <div className="ml-[0.215em] border-l h-2 border-neutral-300" />
          <div className="ml-[0.215em] border-l h-8 border-neutral-300" />

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="size-2 rounded-full bg-neutral-400" />
            </div>
            <div className="flex whitespace-nowrap leading-none gap-x-2">
              <p className="text-neutral-700 font-semibold">2025</p>
              <p>정보처리산업기사 예정</p>
            </div>
          </div>
          <div className="ml-[0.215em] border-l h-16 border-neutral-300" />

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <div className="size-2 rounded-full bg-neutral-400" />
            </div>
            <div className="flex whitespace-nowrap leading-none gap-x-2">
              <p>다음엔 무엇이 있을까요?</p>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={'/images/mc_fnd.png'}
            alt="mc_fnd"
            width={1600}
            height={900}
            className="w-fit rounded-sm aspect-video object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-20">
        <div className="font-semibold text-xl">
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

      <section className="font-semibold text-xl mt-20">
        <p>
          AVR 계열의 <a className="text-blue-500">ATmega128</a>을 주로 사용하며,
        </p>
        <p>
          <a className="text-blue-500">외부 인터럽트</a>,{' '}
          <a className="text-blue-500">T/C</a> 등의 내장 기능을 이용해서, 원하는
          기능을 구현할 수 있습니다.
        </p>
        <div className="mt-8 flex overflow-x-scroll gap-x-2">
          <Image
            src={'/images/oscilloscopse.png'}
            alt="mc_fnd"
            width={1600}
            height={900}
            className="w-3/4 rounded-sm aspect-video object-cover"
          />
          <Image
            src={'/images/serial.png'}
            alt="mc_fnd"
            width={1600}
            height={900}
            className="w-3/4 rounded-sm aspect-video object-cover"
          />
          <Image
            src={'/images/four_fnd.png'}
            alt="mc_fnd"
            width={1600}
            height={900}
            className="w-3/4 rounded-sm aspect-video object-cover"
          />
        </div>
      </section>

      <section className="mt-20 grid gap-y-4 gap-x-2">
        <div className="flex items-baseline gap-x-5">
          <p className="font-semibold text-lg text-neutral-600">2025</p>
          <div className="font-medium text-neutral-700"></div>
        </div>
        <div className="flex items-baseline gap-x-5">
          <p className="font-semibold text-lg text-neutral-600">2024</p>
          <div className="font-medium text-neutral-700">
            <p>Google I/O</p>
            <p>흑백개발자 해커톤</p>
            <p>마이스터고 4개교 해커톤</p>
            <p>Link 데모데이</p>
            <p>드로이드나이츠</p>
          </div>
        </div>
        <div className="flex items-baseline gap-x-5">
          <p className="font-bold text-lg text-neutral-600">2023</p>
          <div className="font-medium text-neutral-700">
            <p>SK DevOcean</p>
            <p>K-DEVCON</p>
            <p>대한민국 소프트웨어대전</p>
            <p>싱가포르 ATxSG</p>
            <p>인포그랩 방문</p>
            <p>인프랩 방문</p>
          </div>
        </div>
        <div className="flex items-baseline gap-x-5">
          <p className="font-semibold text-lg text-neutral-600">2022</p>
          <div className="font-medium text-neutral-700">
            <p>지스타</p>
          </div>
        </div>
      </section>
    </div>
  );
}
