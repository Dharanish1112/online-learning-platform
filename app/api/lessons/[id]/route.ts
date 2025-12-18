import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ScheduledLesson from "@/lib/models/ScheduledLesson"

// DELETE a scheduled lesson
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    await ScheduledLesson.findByIdAndDelete(id)
    return NextResponse.json({ message: "Lesson deleted" })
  } catch (error) {
    console.error("Error deleting lesson:", error)
    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 })
  }
}

