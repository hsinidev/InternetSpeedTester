
export enum TestState {
  IDLE = 'Idle',
  PING = 'Ping',
  DOWNLOAD = 'Download',
  UPLOAD = 'Upload',
  COMPLETE = 'Complete'
}

export interface TestResults {
  ping: number | null;
  download: number | null;
  upload: number | null;
}
