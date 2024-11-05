import mongoose, { Document, Schema } from "mongoose";

interface IProposal extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  description: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

const ProposalSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Proposal =
  mongoose.models.Proposal ||
  mongoose.model<IProposal>("Proposal", ProposalSchema);
export default Proposal;
