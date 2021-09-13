import { FormikErrors, FormikTouched } from 'formik';
import moment from 'moment';

interface Token {
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  role: 'USER' | 'ADMIN';
  email: string;
}

export function getErrorFormatter<T>(
  touched: FormikTouched<T>,
  errors: FormikErrors<T>
): (fieldName: keyof T) => string {
  // Add a non-breaking space to empty helperText to prevent inputs from jumping around
  return (fieldName) => (touched[fieldName] && (errors[fieldName] as string)) || '\xA0';
}

function parseToken(tokenString: string): Token {
  const tokenPayloadBase64 = tokenString.split('.')[1];
  const tokenPayload = atob(tokenPayloadBase64);

  return JSON.parse(tokenPayload);
}

export function isTokenExpired(tokenString: string): boolean {
  const expirationTime = parseToken(tokenString).exp;
  return Boolean(expirationTime) && expirationTime < Date.now() / 1000;
}

export function timeAgo(time: string) {
  const secondsElapsed = moment().diff(time, 'seconds');
  const dayStart = moment().startOf('day').seconds(secondsElapsed);

  if (secondsElapsed < 60) {
    return `${dayStart.format('s')} seconds ago`;
  }

  return `${dayStart.format('m')} min ${dayStart.format('s')} seconds ago`;
}

export function timeRemaining(time: string, duration: number) {
  const secondsElapsed = moment().diff(time, 'seconds');
  const secondsRemain = duration - secondsElapsed;
  const dayStart = moment().startOf('day').seconds(secondsRemain);

  if (secondsRemain < 60) {
    return `${dayStart.format('s')} seconds`;
  }
  return `${dayStart.format('m')} min ${dayStart.format('s')} seconds`;
}

export function timeDuration(duration: number) {
  const dayStart = moment().startOf('day').seconds(duration);

  if (duration < 60) {
    return `${dayStart.format('s')} seconds`;
  }
  return `${dayStart.format('m')} min ${dayStart.format('s')} seconds`;
}

export function timeRange(time: string, duration: number) {
  return `${moment(time).format('LTS')} to ${moment(time).add(duration, 's').format('LTS ZZ')}`;
}
