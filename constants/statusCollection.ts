import { Statuses } from "types/anime";

const statusCollection: {
  [key in Statuses]: string;
} = {
  [Statuses.Dropped]: "Бросил",
  [Statuses.Viewed]: "Просмотренно",
  [Statuses.InProgress]: "Смотрю",
};

export default statusCollection;
