import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/utils/databaselocal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { db } = await connect();
    const data = await db.collection("users").findOne({ teste: "teste" });

    res.status(200).json({data});
  } catch (e) {
    console.log(e);
  }
}
