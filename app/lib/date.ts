export function getFourMonthsAgoMonday(): Date {
    const now = new Date();
    now.setMonth(now.getMonth() - 6);

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const dayOfWeek = firstDayOfMonth.getDay();
    const offset = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const firstMonday = new Date(
      firstDayOfMonth.getFullYear(),
      firstDayOfMonth.getMonth(),
      firstDayOfMonth.getDate() + offset
    );

    return firstMonday;
  }

  export function getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dateArray: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dateArray.push(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD 형식
        currentDate.setDate(currentDate.getDate() + 1); // 하루 증가
    }

    return dateArray;
  }
