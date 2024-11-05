import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Proposal from "@/models/Proposal";

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
