export interface RoundResponse {
  durationMs: number;
  id: string;
  startTime: string;
  // startTime: Instant;
}

export interface Instant {
  epochSeconds: number;
  nanosecondsOfSecond: number;
}
