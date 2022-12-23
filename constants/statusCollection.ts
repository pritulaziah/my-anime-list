import { AnimeStatus } from "types/anime";

const statusCollection: {
  [key in AnimeStatus]: string;
} = {
  [AnimeStatus.Closed]: "Бросил",
  [AnimeStatus.Done]: "Просмотренно",
  [AnimeStatus.InProgress]: "Смотрю",
  [AnimeStatus.Paused]: "На паузе",
};

export default statusCollection;
