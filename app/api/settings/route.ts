import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import UserSettings from "@/lib/models/UserSettings"

const DEFAULT_USER_ID = "default-user"

// GET user settings
export async function GET() {
  try {
    await connectDB()
    let settings = await UserSettings.findOne({ userId: DEFAULT_USER_ID })
    
    if (!settings) {
      // Create default settings
      settings = await UserSettings.create({
        userId: DEFAULT_USER_ID,
        name: "Dharanish S",
        email: "dharanish@example.com",
        bio: "Passionate learner exploring ML, IoT, and web development.",
        theme: "light",
        language: "en",
        timezone: "GMT+5:30",
        emailNotifications: true,
        pushNotifications: true,
        lessonReminders: true,
        discussionReplies: true,
        weeklyDigest: false,
        twoFactorEnabled: false,
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// PUT update user settings
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const settings = await UserSettings.findOneAndUpdate(
      { userId: DEFAULT_USER_ID },
      { $set: body },
      { new: true, upsert: true }
    )
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

