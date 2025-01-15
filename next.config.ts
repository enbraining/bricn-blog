import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
                // Youtube Thumbnail
				protocol: "https",
				hostname: "i.ytimg.com",
			},
		],
	},
};

export default nextConfig;
