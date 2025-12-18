import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ScheduledLesson from "@/lib/models/ScheduledLesson"

// GET all scheduled lessons
export async function GET() {
  try {
    await connectDB()
    const lessons = await ScheduledLesson.find({}).sort({ createdAt: -1 })
    return NextResponse.json(lessons)
  } catch (error) {
    console.error("Error fetching lessons:", error)
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 })
  }
}

// POST create new scheduled lesson
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const lesson = await ScheduledLesson.create({
      day: body.day,
      dayLabel: body.dayLabel,
      time: body.time,
      duration: body.duration,
      topic: body.topic,
      notes: body.notes,
    })
    
    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    console.error("Error creating lesson:", error)
    return NextResponse.json({ error: "Failed to create lesson" }, { status: 500 })
  }
}

