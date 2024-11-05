import { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../models/Post";
import dbConnect from "@/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(req.query.id).populate(
          "user",
          "name email"
        );
        if (!post) {
          return res
            .status(404)
            .json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, data: post });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, error: (error as Error).message });
      }

    case "PUT":
      try {
        const post = await Post.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          return res
            .status(404)
            .json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, data: post });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, error: (error as Error).message });
      }

    case "DELETE":
      try {
        await Post.deleteOne({ _id: req.query.id });
        return res.status(204).json({ success: true, message: "Post deleted" });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, error: (error as Error).message });
      }

    default:
      return res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
  }
}
