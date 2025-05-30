import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const formatTZ = (isoDateString: string, formatStr: string): string =>
  formatInTimeZone(parseISO(isoDateString), 'Asia/Tokyo', formatStr);
