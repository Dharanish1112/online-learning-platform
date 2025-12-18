"use client"

import { FormEvent, useState, useEffect, useCallback } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Plus, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Prototype {
  _id: string
  title: string
  description?: string
  category?: string
  status: string
  hasChart: boolean
  createdAt: string
  updatedAt: string
}

export default function PrototypesPage() {
  const [filter, setFilter] = useState("All Prototypes")
  const [prototypes, setPrototypes] = useState<Prototype[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const fetchPrototypes = useCallback(async () => {
    try {
      const res = await fetch("/api/prototypes")
      if (res.ok) {
        const data = await res.json()
        setPrototypes(data)
      }
    } catch (error) {
      console.error("Failed to fetch prototypes:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrototypes()
  }, [fetchPrototypes])

  const handleCreatePrototype = async (e: FormEvent) => {
    e.preventDefault()

    if (!newTitle.trim()) {
      setFormError("Please provide a title for your prototype.")
      return
    }

    try {
      const res = await fetch("/api/prototypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
          category: newCategory,
        }),
      })

      if (res.ok) {
        await fetchPrototypes()
        resetFormState()
      } else {
        setFormError("Failed to create prototype. Please try again.")
      }
    } catch (error) {
      console.error("Error creating prototype:", error)
      setFormError("Failed to create prototype. Please try again.")
    }
  }

  const resetFormState = () => {
    setNewTitle("")
    setNewDescription("")
    setNewCategory("")
    setFormError(null)
    setIsCreateOpen(false)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

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
              <Dialog
                open={isCreateOpen}
                onOpenChange={(open) => {
                  setIsCreateOpen(open)
                  // Clear any previous validation errors when dialog is opened or closed
                  if (!open) {
                    setNewTitle("")
                    setNewDescription("")
                    setNewCategory("")
                  }
                  setFormError(null)
                }}
              >
                <DialogTrigger asChild>
                  <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> CREATE PROTOTYPES
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Prototype</DialogTitle>
                    <DialogDescription>
                      Build a new prototype or solution. Start by giving it a clear title and description.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreatePrototype} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prototype Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Smart Home Automation System"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Describe what your prototype does, its key features, and the problem it solves..."
                        className="w-full min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category / Type
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select category</option>
                          <option value="Prototype">Prototype</option>
                          <option value="Solution">Solution</option>
                          <option value="IoT">IoT</option>
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {formError && <p className="text-sm text-red-500">{formError}</p>}

                    <DialogFooter className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCreateOpen(false)}
                        className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Create Prototype
                      </button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-3 text-center py-8 text-gray-500">Loading prototypes...</div>
              ) : prototypes.length === 0 ? (
                <div className="col-span-3 text-center py-8 text-gray-500">No prototypes found. Create one!</div>
              ) : (
                prototypes.map((proto, i) => (
                  <div
                    key={proto._id}
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
                      {proto.status} · Edited {formatTime(proto.updatedAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
