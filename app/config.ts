export const config = {
  siteTitle: 'Bricn Blog',
  siteUrl: 'https://bricn.net',
  supabaseBucketName: process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || '',
  greenStack: ['Java'],
  yellowStack: [
    'Next.js',
    'Typescript',
    'AWS EC2',
    'Spring Framework',
    'Nest.js',
    'Kotlin',
  ],
  redStack: ['AWS Lambda', 'C++', 'Rust'],
};
