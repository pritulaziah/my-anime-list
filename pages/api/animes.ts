import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import AnimeModel from "models/anime";
import { IAnime } from "types/anime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAnime[]>
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const requestBody = req.body;
      const { name, rating } = requestBody;

      console.log(name, rating);

      await AnimeModel.findOneAndUpdate(
        {
          name,
        },
        { name, rating },
        { upsert: true }
      );

      res.status(200).end();
      break;
    case "GET":
      try {
        await connectToDatabase();
        const animes = await AnimeModel.find({}).sort({ name: "asc" });

        res.status(200).json(animes);
      } catch (error) {
        res.status(404).end();
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${requestMethod} Not Allowed`);
      break;
  }
}
