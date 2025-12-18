import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import mongoose from "mongoose"

export async function GET(
  request: Request,
  { params }: { params: { collection: string } }
) {
  try {
    await connectDB()
    const db = mongoose.connection.db

    if (!db) {
      return NextResponse.json({ error: "Database not connected" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "25")
    const query = searchParams.get("query") || "{}"

    const collectionName = params.collection
    const collection = db.collection(collectionName)

    // Parse query string to MongoDB query object
    let mongoQuery = {}
    try {
      if (query && query !== "{}") {
        mongoQuery = JSON.parse(query)
      }
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid query format. Must be valid JSON." },
        { status: 400 }
      )
    }

    // Get total count
    const total = await collection.countDocuments(mongoQuery)

    // Get documents with pagination
    const skip = (page - 1) * limit
    const documents = await collection
      .find(mongoQuery)
      .skip(skip)
      .limit(limit)
      .toArray()

    // Convert ObjectId to string for JSON serialization
    const serializedDocuments = documents.map((doc) => {
      const serialized = { ...doc }
      if (doc._id && typeof doc._id === "object") {
        serialized._id = doc._id.toString()
      }
      return serialized
    })

    return NextResponse.json({
      documents: serializedDocuments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    )
  }
}
