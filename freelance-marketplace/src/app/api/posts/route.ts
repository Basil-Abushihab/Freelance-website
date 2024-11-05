import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Post from "../../../models/Post";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.JWT_SECRET || "M9jmyZaK6lz7ud7sq63dZ3HrALJhFJCFilBC5_QrYA0=";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = (decoded as { id: string }).id;

    const postData = await req.json();
    const newPost = await Post.create({ ...postData, user: userId });

    const user = await User.findById(userId).select("name");

    return NextResponse.json(
      { success: true, data: { ...newPost.toObject(), userName: user?.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("id");

    if (postId) {
      const post = await Post.findById(postId).populate("user", "name");
      if (!post) {
        return NextResponse.json(
          { message: "Post not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: { ...post.toObject(), userName: post.user.name },
        },
        { status: 200 }
      );
    }

    const posts = await Post.find().populate("user", "name");

    const postsWithUserNames = posts.map((post) => ({
      ...post.toObject(),
      userName: post.user.name,
    }));

    return NextResponse.json(
      { success: true, data: postsWithUserNames },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await dbConnect();

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = (decoded as { id: string }).id;

    const { id, ...updateData } = await req.json();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.user.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    const user = await User.findById(userId).select("name");

    return NextResponse.json(
      {
        success: true,
        data: { ...updatedPost.toObject(), userName: user?.name },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = (decoded as { id: string }).id;

    const { id } = await req.json();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.user.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await Post.findByIdAndDelete(id);
    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
