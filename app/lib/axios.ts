import axios from "axios";

export const YoutubeApi = axios.create({
	baseURL: "https://www.googleapis.com/youtube/v3",
	params: {
		key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
	},
});
