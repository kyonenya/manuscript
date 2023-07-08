import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const formatTZ = (isoDateString: string, formatStr: string): string =>
  format(utcToZonedTime(parseISO(isoDateString), 'Asia/Tokyo'), formatStr);
