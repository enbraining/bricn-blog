'use client';

import {
  IconArrowBadgeRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconChessBishop,
  IconCode,
} from '@tabler/icons-react';

import H3 from '../components/basic/H3';
import Hr from '../components/basic/Hr';
import LineLink from '../components/LineLink';

export default function Page() {
  return (
    <div>
      <div className="grid gap-y-16">
        {/* Social */}
        <div>
          <H3>Social</H3>
          <Hr />
          <div className="grid gap-y-2">
            <LineLink
              icon={<IconBrandGithub size={22} />}
              href={'https://github.com/enbraining'}
              name="Github"
            />
            <LineLink
              classname="hover:border-[#006EAC] hover:bg-[#141e23]"
              icon={<IconBrandLinkedin size={22} />}
              href={'https://linkedin.com/in/enbraining'}
              name="LinkedIn"
            />
            <LineLink
              classname="hover:border-[#EE0002] hover:bg-[#2b1919]"
              icon={<IconBrandYoutube size={22} />}
              href={'https://youtube.com/@enbraining'}
              name="Youtube"
            />
          </div>
        </div>

        {/* Problem Solving */}
        <div>
          <H3>Problem Solving</H3>
          <Hr />
          <div className="grid gap-y-2">
            <LineLink
              classname="hover:border-[#18CE3B] hover:bg-[#0e1e11]"
              icon={<IconArrowBadgeRight size={22} />}
              href={'https://solved.ac/profile/enbraining'}
              name="Solved.ac"
            />
            <LineLink
              classname="hover:border-[#0076C0] hover:bg-[#11191e]"
              icon={<IconCode size={22} />}
              href={'https://www.acmicpc.net/user/enbraining'}
              name="Baekjoon"
            />
          </div>
        </div>

        {/* Game */}
        <div>
          <H3>Game</H3>
          <Hr />
          <div className="grid gap-y-2">
            <LineLink
              classname="hover:border-[#5D9948] hover:bg-[#182011]"
              icon={<IconChessBishop size={22} />}
              href={'https://www.chess.com/member/enbraining'}
              name="Chess.com (486)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
