import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Prototype from "@/lib/models/Prototype"

// GET all prototypes
export async function GET() {
  try {
    await connectDB()
    const prototypes = await Prototype.find({}).sort({ createdAt: -1 })
    return NextResponse.json(prototypes)
  } catch (error) {
    console.error("Error fetching prototypes:", error)
    return NextResponse.json({ error: "Failed to fetch prototypes" }, { status: 500 })
  }
}

// POST create new prototype
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const prototype = await Prototype.create({
      title: body.title,
      description: body.description,
      category: body.category,
      status: "In Draft",
      hasChart: true,
    })
    
    return NextResponse.json(prototype, { status: 201 })
  } catch (error) {
    console.error("Error creating prototype:", error)
    return NextResponse.json({ error: "Failed to create prototype" }, { status: 500 })
  }
}

