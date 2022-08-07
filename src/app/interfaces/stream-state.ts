export interface StreamState {
  url: string | null;
  playing: boolean;
  duration: number | null;
  canplay: boolean;
  error: boolean;
}
