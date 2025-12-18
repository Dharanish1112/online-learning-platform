import mongoose, { Schema, Document } from "mongoose"

export interface IPrototype extends Document {
  title: string
  description?: string
  category?: string
  status: string
  hasChart: boolean
  createdAt: Date
  updatedAt: Date
}

const PrototypeSchema = new Schema<IPrototype>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    status: { type: String, default: "In Draft" },
    hasChart: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Prototype || mongoose.model<IPrototype>("Prototype", PrototypeSchema)

