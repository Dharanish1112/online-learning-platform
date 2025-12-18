import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import mongoose from "mongoose"

export async function GET() {
  try {
    await connectDB()
    const db = mongoose.connection.db

    if (!db) {
      return NextResponse.json({ error: "Database not connected" }, { status: 500 })
    }

    // Get all collection names
    const collections = await db.listCollections().toArray()
    
    // Get document counts for each collection
    const collectionsWithCounts = await Promise.all(
      collections.map(async (collection) => {
        const count = await db.collection(collection.name).countDocuments()
        return {
          name: collection.name,
          count,
        }
      })
    )

    return NextResponse.json({ collections: collectionsWithCounts })
  } catch (error) {
    console.error("Error fetching collections:", error)
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    )
  }
}
