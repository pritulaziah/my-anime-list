import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import AnimeModel from "models/anime";
import { IAnime } from "types/anime";

type Data = {
  data: IAnime[];
};

export const getAnimes = async (): Promise<IAnime[]> => {
  await connectToDatabase();
  const animes = await AnimeModel.find({});

  return animes;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectToDatabase();
    const animes = await AnimeModel.find({});

    res.status(200).json({ data: animes });
  } catch (error) {
    res.status(404).end();
  }
}
