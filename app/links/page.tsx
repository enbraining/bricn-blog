'use client';

import LineLink from '../components/LineLink';

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-5 items-start">
        <div className="grid gap-y-2">
          <LineLink type="GITHUB" href={'https://github.com/enbraining'}>
            Github
          </LineLink>
          <LineLink type="LINKEDIN" href={'https://linkedin.com/in/enbraining'}>
            LinkedIn
          </LineLink>
          <LineLink
            type="SOLVEDAC"
            href={'https://solved.ac/profile/enbraining'}
          >
            Solved.ac
          </LineLink>
          <LineLink type="YOUTUBE" href={'https://youtube.com/@enbraining'}>
            Youtube
          </LineLink>
        </div>
      </div>
    </div>
  );
}
