import { IconAt, IconSchool } from '@tabler/icons-react';

export default function Myself() {
  return (
    <div className="font-semibold">
      <p className="mb-12 font-black text-4xl text-neutral-500">
        아키텍쳐와 함께 하는 개발자 김동학입니다. 많은 패러다임과 서비스들을
        접하면서 역량을 키우고 있습니다
      </p>
      <ul className="text-xl grid gap-y-1">
        <li className="flex gap-x-8 items-center">
          <IconAt size={25} className="text-neutral-600" />
          <p className="text-neutral-500">me@bricn.net</p>
        </li>
        <li className="flex gap-x-8">
          <IconSchool size={25} className="text-neutral-600" />
          <div className="text-neutral-500">
            <p>광주소프트웨어마이스터고등학교</p>
            <p>스마트IoT과 재학</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
