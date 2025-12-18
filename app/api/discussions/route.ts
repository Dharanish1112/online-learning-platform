import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Discussion from "@/lib/models/Discussion"

// GET all discussions
export async function GET() {
  try {
    await connectDB()
    const discussions = await Discussion.find({}).sort({ createdAt: -1 })
    return NextResponse.json(discussions)
  } catch (error) {
    console.error("Error fetching discussions:", error)
    return NextResponse.json({ error: "Failed to fetch discussions" }, { status: 500 })
  }
}

// POST create new discussion
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const discussion = await Discussion.create({
      title: body.title,
      author: body.author || "You",
      details: body.details,
      tag: body.tag,
      replier: "–",
      comments: 0,
    })
    
    return NextResponse.json(discussion, { status: 201 })
  } catch (error) {
    console.error("Error creating discussion:", error)
    return NextResponse.json({ error: "Failed to create discussion" }, { status: 500 })
  }
}

