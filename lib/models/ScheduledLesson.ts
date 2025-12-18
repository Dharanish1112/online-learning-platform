import mongoose, { Schema, Document } from "mongoose"

export interface IScheduledLesson extends Document {
  day: number
  dayLabel: string
  time: string
  duration: string
  topic: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const ScheduledLessonSchema = new Schema<IScheduledLesson>(
  {
    day: { type: Number, required: true },
    dayLabel: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    topic: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.ScheduledLesson || mongoose.model<IScheduledLesson>("ScheduledLesson", ScheduledLessonSchema)

