import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer';

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["./public/posts/**/*"]
  },
  compiler: {
    styledComponents: true
  }
};

const wrappedConfig = withContentlayer(nextConfig);
export default wrappedConfig;
