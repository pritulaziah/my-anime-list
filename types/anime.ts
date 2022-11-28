export enum Statuses {
  Closed = "closed",
  Done = "done",
  InProgress = "inProgress",
  Paused = "paused",
}

export interface IAnime {
  id: number;
  name: string;
  russian: string;
  status?: Statuses;
  rating?: number | null;
  episodes?: number;
  episodes_watch?: number | null;
  comment?: string | null;
}
