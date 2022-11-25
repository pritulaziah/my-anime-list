import { Statuses } from "types/anime";

const statusCollection: {
  [key in Statuses]: string;
} = {
  [Statuses.Closed]: "Бросил",
  [Statuses.Done]: "Просмотренно",
  [Statuses.InProgress]: "Смотрю",
  [Statuses.Paused]: "На паузе",
};

export default statusCollection;
