import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import dbConnect from "@/utils/dbConnect";
import jwt from "jsonwebtoken";

const connectToDB = async () => {
  await dbConnect();
};

interface DecodedToken {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find().populate("user", "name email");
        return res.status(200).json({ success: true, data: posts });
      } catch (error) {
        console.error("Error fetching posts:", error);
        return res
          .status(500)
          .json({ success: false, error: (error as Error).message });
      }

    case "POST": {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "No token provided" });
      }

      try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return res
            .status(500)
            .json({ success: false, message: "JWT secret is not defined" });
        }

        const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
        const userId = decoded.id;

        const postData = req.body;

        const post = await Post.create({
          ...postData,
          user: userId,
        });

        return res.status(201).json({ success: true, data: post });
      } catch (error) {
        console.error("Error creating post:", error);
        return res.status(401).json({
          success: false,
          message: "Invalid token or post data",
          error: (error as Error).message,
        });
      }
    }

    default:
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
  }
}
