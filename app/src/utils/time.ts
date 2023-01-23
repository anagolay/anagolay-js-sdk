import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime); // use plugin

/**
 * Use dayjs to convert the time to string in a fromNow manner
 * @param seconds -
 * @returns
 */
export function timeAgo(seconds: number, withoutSuffix: boolean = false): string {
  const _s = seconds * 1000;

  return dayjs(_s).fromNow(withoutSuffix);
}
