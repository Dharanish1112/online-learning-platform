import mongoose, { Schema, Document } from "mongoose"

export interface IDiscussion extends Document {
  title: string
  author: string
  details: string
  tag?: string
  replier: string
  comments: number
  createdAt: Date
  updatedAt: Date
}

const DiscussionSchema = new Schema<IDiscussion>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true, default: "Anonymous" },
    details: { type: String, required: true },
    tag: { type: String },
    replier: { type: String, default: "–" },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Discussion || mongoose.model<IDiscussion>("Discussion", DiscussionSchema)

