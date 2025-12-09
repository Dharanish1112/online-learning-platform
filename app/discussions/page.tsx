"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Search, Plus, MessageCircle } from "lucide-react"

const discussions = [
  { id: 1, title: "3D Place solution", author: "Shams Tabrez", time: "7h ago", replier: "Nahin", comments: 9 },
  {
    id: 2,
    title: "what is the pcb board made of?",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 3,
  },
  {
    id: 3,
    title: "will reactjs take over the web development sector?",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 62,
  },
  {
    id: 4,
    title: "Soil Moisture Prediction with ML",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 5,
  },
  {
    id: 5,
    title: "Deep Learning in the field of labour.",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 1,
  },
  {
    id: 6,
    title: "Multioutput Regressor as a wrapper",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 12,
  },
  {
    id: 7,
    title: "Big Opportunity of IoT in Africa",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 7,
  },
  {
    id: 8,
    title: "Is there any TechHub competition in recent days?",
    author: "Shams Tabrez",
    time: "7h ago",
    replier: "Nahin",
    comments: 2,
  },
]

const tags = ["Machine Learning", "IoT", "UI/UX", "algorithm", "Biology", "more"]

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussions</h1>
            <p className="text-gray-600">
              Discuss the OLP platform — this includes sharing feedback, asking questions, and more.
            </p>
          </div>

          {/* Search and Ask */}
          <div className="flex gap-4 mb-6 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="search discussion"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={20} /> Ask New
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-3 mb-8 flex-wrap animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Discussions List */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            {discussions.map((disc, i) => (
              <div
                key={disc.id}
                className="bg-white rounded-lg p-6 border border-gray-200 hover-lift cursor-pointer transition-all duration-300 hover:border-blue-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                        ST
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{disc.title}</h3>
                        <p className="text-sm text-gray-600">
                          {disc.author} · Last comment {disc.time} ago by {disc.replier}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div className="flex flex-col items-end">
                      <button className="text-gray-400 hover:text-gray-600 text-sm">↕</button>
                      <span className="text-gray-700 font-semibold">{disc.comments}</span>
                    </div>
                    <MessageCircle className="text-gray-400 size-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
