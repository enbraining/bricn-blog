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
              icon={<IconBrandLinkedin size={22} />}
              href={'https://linkedin.com/in/enbraining'}
              name="LinkedIn"
            />
            <LineLink
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
              icon={<IconArrowBadgeRight size={22} />}
              href={'https://solved.ac/profile/enbraining'}
              name="Solved.ac"
            />
            <LineLink
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
              icon={<IconChessBishop size={22} />}
              href={'https://www.chess.com/member/enbraining'}
              name="Chess.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
