"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Plus, Filter } from "lucide-react"

const prototypes = [
  { id: 1, title: "Lorem Project", status: "In Draft", edited: "5 min ago", hasChart: true },
  { id: 2, title: "Ipsum prototype", status: "In Draft", edited: "5 min ago", hasChart: true },
]

export default function PrototypesPage() {
  const [filter, setFilter] = useState("All Prototypes")

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 space-y-8">
          {/* Featured Prototypes Carousel */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-8 animate-fadeInUp overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Explore Solution Prototypes</h2>
              <button className="text-blue-600 font-semibold hover:text-blue-700">see all →</button>
            </div>
            <div className="flex gap-6 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-64 bg-white rounded-lg p-4 hover-lift">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${i % 2 === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                      {i % 2 === 0 ? "Prototype" : "Solution"} 📍
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {i % 2 === 0 ? "Simple Rocket Building" : "Home security with basic electronics"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {i % 2 === 0 ? "Simple Rocket building for beginners" : "Home security with basic electronics"}
                  </p>
                  <div className="w-24 h-24 mx-auto text-5xl">👨‍💻</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prototypes Grid */}
          <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-gray-600" />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Prototypes</option>
                  <option>My Prototypes</option>
                  <option>Shared</option>
                </select>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={20} /> CREATE PROTOTYPES
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prototypes.map((proto, i) => (
                <div
                  key={proto.id}
                  className="bg-white rounded-lg p-6 shadow-sm hover-lift animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
                >
                  {proto.hasChart && (
                    <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-conic from-blue-400 via-blue-500 to-blue-600 opacity-20"></div>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{proto.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {proto.status} · Edited {proto.edited}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
