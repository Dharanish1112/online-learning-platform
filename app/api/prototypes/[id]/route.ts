import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Prototype from "@/lib/models/Prototype"

// DELETE a prototype
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    await Prototype.findByIdAndDelete(id)
    return NextResponse.json({ message: "Prototype deleted" })
  } catch (error) {
    console.error("Error deleting prototype:", error)
    return NextResponse.json({ error: "Failed to delete prototype" }, { status: 500 })
  }
}

