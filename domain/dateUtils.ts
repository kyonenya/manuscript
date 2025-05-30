import { formatInTimeZone } from 'date-fns-tz';
import { parseISO } from 'date-fns';

export const formatTZ = (isoDateString: string, formatStr: string): string =>
  formatInTimeZone(parseISO(isoDateString), 'Asia/Tokyo', formatStr);
