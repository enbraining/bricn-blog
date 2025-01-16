import type { NextConfig } from "next";
import { getBaseUrl } from "./app/lib/url";

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
    headers: async () => {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: getBaseUrl() },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Post-Category" },
                ]
            }
        ]
    }
};

export default nextConfig;
