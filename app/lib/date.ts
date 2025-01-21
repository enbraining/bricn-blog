import dayjs from "dayjs";

export function formatYearMonth(date?: string): string {
	return date ? dayjs(date).format("YYYY년 MM월") : "?";
}

export function formatYearMonthDay(date?: string): string {
	return date ? dayjs(date).format("YYYY년 MM월 DD일") : "?";
}
