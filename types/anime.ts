export enum AnimeStatus {
  Closed = "closed",
  Done = "done",
  InProgress = "inProgress",
  Paused = "paused",
}

export interface IAnime {
  id: number;
  name: string;
  status?: AnimeStatus;
  rating?: number | null;
  episodes?: number;
  episodes_watch?: number | null;
  comment?: string | null;
}
