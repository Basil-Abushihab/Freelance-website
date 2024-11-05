import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  description: string;
  budget: string;
  deadline: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const PostSchema = new Schema<IPost>({
  description: { type: String, required: true },
  budget: { type: String, required: true },
  deadline: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
