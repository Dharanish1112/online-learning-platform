import mongoose, { Schema, Document } from "mongoose"

export interface IUserSettings extends Document {
  userId: string
  name: string
  email: string
  bio?: string
  theme: "light" | "dark" | "system"
  language: string
  timezone: string
  emailNotifications: boolean
  pushNotifications: boolean
  lessonReminders: boolean
  discussionReplies: boolean
  weeklyDigest: boolean
  twoFactorEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: { type: String, required: true, unique: true, default: "default-user" },
    name: { type: String, required: true, default: "User" },
    email: { type: String, required: true, default: "user@example.com" },
    bio: { type: String },
    theme: { type: String, enum: ["light", "dark", "system"], default: "light" },
    language: { type: String, default: "en" },
    timezone: { type: String, default: "GMT+5:30" },
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    lessonReminders: { type: Boolean, default: true },
    discussionReplies: { type: Boolean, default: true },
    weeklyDigest: { type: Boolean, default: false },
    twoFactorEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.UserSettings || mongoose.model<IUserSettings>("UserSettings", UserSettingsSchema)

