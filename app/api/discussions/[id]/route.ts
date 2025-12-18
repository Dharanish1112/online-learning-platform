import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Discussion from "@/lib/models/Discussion"

// DELETE a discussion
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    await Discussion.findByIdAndDelete(id)
    return NextResponse.json({ message: "Discussion deleted" })
  } catch (error) {
    console.error("Error deleting discussion:", error)
    return NextResponse.json({ error: "Failed to delete discussion" }, { status: 500 })
  }
}

