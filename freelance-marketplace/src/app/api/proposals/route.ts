import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";
import Proposal from "@/models/Proposal";
import User from "@/models/User";
import Post from "@/models/Post";

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

    const { postId, description } = await req.json();

    const newProposal = new Proposal({
      userId,
      postId,
      description,
    });

    const savedProposal = await newProposal.save();

    const user = await User.findById(userId).select("name");

    return NextResponse.json(
      {
        success: true,
        data: { ...savedProposal.toObject(), userName: user?.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
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

    const posts = await Post.find({ user: userId })
      .populate("user", "name")
      .exec();

    const proposals = await Proposal.find()
      .populate("userId", "name")
      .populate({
        path: "postId",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .exec();

    const results = posts.map((post) => {
      const postProposals = proposals.filter((proposal) =>
        proposal.postId._id.equals(post._id)
      );

      return {
        post: {
          _id: post._id,
          description: post.description,
          budget: post.budget,
          deadline: post.deadline,
          posterName: post.user?.name || "Unknown",
        },
        proposals: postProposals.map((proposal) => ({
          _id: proposal._id,
          description: proposal.description,
          status: proposal.status,
          createdAt: proposal.createdAt,
          proposerName: proposal.userId?.name || "Unknown",
        })),
      };
    });

    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts and proposals:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;
  const { status } = await req.json();

  try {
    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProposal) {
      return NextResponse.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedProposal },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating proposal:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
