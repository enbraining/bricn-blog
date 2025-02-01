import { IconAt, IconSchool } from '@tabler/icons-react';
import H2 from './basic/H2';

export default function Myself() {
  return (
    <div>
      <div className="mb-3 inline-block">
        <H2>김동학</H2>
        <p className="text-base text-bricn-300">Backend Engineer</p>
      </div>
      <ul className="text-base grid gap-y-1">
        <li className="flex gap-x-8 items-center">
          <IconAt size={18} className="text-bricn-300" />
          <p className="text-bricn-400">me@bricn.net</p>
        </li>
        <li className="flex gap-x-8">
          <IconSchool size={18} className="text-bricn-300" />
          <div>
            <p className="text-bricn-400">광주소프트웨어마이스터고등학교</p>
            <p className="text-bricn-400">스마트IoT과 재학</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
