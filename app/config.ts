export const config = {
  siteTitle: 'Bricn Blog',
  siteUrl: 'https://bricn.net',
  supabaseBucketName: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || '',
  skillStack: [
    'Java',
    'Next.js',
    'Typescript',
    'AWS EC2',
    'Spring Framework',
    'Nest.js',
    'Kotlin',
    'AWS Lambda',
    'C++',
    'Rust',
  ],
  projects: [
    {
      title: 'GOMS',
      description: '광주소프트웨어마이스터고 외출제 관리',
      stacks: ['Spring Framework', 'Discord.js', 'FCM'],
    },
    {
      title: 'SMS',
      description: '광주소프트웨어마이스터고 포트폴리오 관리',
      stacks: [
        'Hexagonal Architecture',
        'Spring Framework',
        'AWS ECR',
        'AWS EC2',
        'MySQL',
        'AWS S3',
      ],
    },
    {
      title: 'GAuth',
      description: '광주소프트웨어마이스터고 통합 소셜 로그인',
      stacks: ['MariaDB', 'Spring Framework', 'AWS EC2', 'Redis'],
    },
    {
      title: 'GOGO v2',
      description: '체육대회 경기 베팅',
      stacks: ['Spring Batch', 'CoolSMS', 'MySQL', 'Docker'],
    },
    {
      title: 'Prisism',
      description: '안정적인 1:1 랜덤채팅',
      stacks: ['Next.js', 'Spring Framework', 'WebSocket', 'Docker', 'Ansible'],
    },
    {
      title: 'GIZ',
      description: '광주소프트웨어마이스터고 디스코드 학년 관리 봇',
      stacks: ['Discord.js'],
    },
    {
      title: '플러딩',
      description: '광주소프트웨어마이스터고 통합 관리 플랫폼',
      stacks: [
        'PostgreSQL',
        'Valkey',
        'Swagger',
        'Spring Framework',
        'AWS ECR',
        'Docker',
      ],
    },
    {
      title: '광탈페',
      description: '광주 탈렌트 페스티벌',
      stacks: ['예정'],
    },
    {
      title: '소금이',
      description: 'MSG 동아리 디스코드 관리 봇',
      stacks: ['Discord.js', 'Firebase', 'Day.js'],
    },
  ],
};
