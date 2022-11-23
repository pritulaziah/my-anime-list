export enum Statuses {
  Dropped = "dropped",
  Viewed = "viewed",
  InProgress = "inProgress",
}

export interface IAnime {
  id: number;
  name: string;
  russian: string;
  status: Statuses;
  rating: number | null;
}
