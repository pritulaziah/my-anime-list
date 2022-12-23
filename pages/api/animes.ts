import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import AnimeModel from "models/anime";
import { IAnime } from "types/anime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAnime[]>
) {
  try {
    await connectToDatabase();
    const data = await AnimeModel.find({}).sort({ name: "asc" });

    res.status(200).json(data);
  } catch (error) {
    res.status(404).end();
  }
}
