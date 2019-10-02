
import moment from 'moment'

export type QueryTimeRange = 'day' | 'week' | 'month' | 'all'

export type OrderBy = 'asc' | 'desc'

export class DateUtil {
  public static toMonthDayYearFormat (date: Date): string {
    return moment(date).utc().format('MMMM Do, YYYY')
  }

  public static toMonthDayFormat (date: Date): string {
    return moment(date).utc().format('MMMM Do')
  }

  public static queryTimeRangeToDays (range: QueryTimeRange) : number {
    switch (range) {
      case 'week':
        return 7;
      case 'day':
        return 1;
      case 'month':
        return 30;
      case 'all':
      default: 
        return 120;
    }
  }

  public static isToday (date: Date) : boolean {
    return moment(date).utc().isSame(moment(), 'day');
  }

  public static isDateInPast (date: Date): boolean {
    if (DateUtil.isToday(date)) {
      return false;
    }
    return moment(date).utc().isBefore(moment(), 'day');
  }

  public static isDateInFuture (date: Date): boolean {
    if (DateUtil.isToday(date)) {
      return false;
    }

    return moment(date).utc().isAfter(moment(), 'day');
  }

  public static createFutureDate(days: number, hours: number, minutes: number): Date {
    return moment(new Date()).utc()
      .add(days, 'day')
      .add(hours, 'hour')
      .add(minutes, 'minute')
      .toDate()
  }

  public static createPreviousDate(days: number, hours: number, minutes: number): Date {
    return moment(new Date()).utc()
      .subtract(days, 'day')
      .subtract(hours, 'hour')
      .subtract(minutes, 'minute')
      .toDate()
  }

  public static getStartOfMonth (): Date {
    return moment(new Date()).utc().startOf('month').toDate();
  }

  public static getSecondWeekOfMonth (): Date {
    return moment(this.getStartOfMonth()).utc().add(14, 'day').toDate();
  }

  public static getLastDayOfMonth (): Date {
    return moment().utc().endOf('month').toDate();
  }
}