"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExternalLink from "./components/ExternalLink";
import Myself from "./components/Myself";
import { config } from "./lib/config";

interface Video {
	id: string;
	snippet: {
		title: string;
		resourceId: {
			videoId: string;
		};
		thumbnails: {
			medium: {
				url: string;
			};
		};
	};
}

export default function Home() {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
            const MAX_RESULTS = 10
            const url = `${config.YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${config.PLAYLIST_ID}&maxResults=${MAX_RESULTS}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`

            const response = await fetch(url)
            const json = await response.json()

			setVideos(json.items);
		};

		fetchVideos();
	}, []);

	return (
		<div>
			<Myself />
			<div className="mt-3">
				<ExternalLink href={"/profile"}>자세히 보기</ExternalLink>
			</div>
			<div className="mt-8 grid grid-flow-col overflow-x-scroll gap-x-4">
				{videos.map((video: Video) => (
					<Link
						target="_blank"
						rel="noopener noreferrer"
						href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
						key={video.id}
						className="w-64 border border-bricn-100 rounded-sm"
					>
						<Image
							width={320}
							height={180}
							src={video.snippet.thumbnails.medium.url}
							alt="thumbnail"
						/>
						<p className="p-2">{video.snippet.title}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
