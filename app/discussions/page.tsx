"use client"

import { FormEvent, useState, useEffect, useCallback } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Search, Plus, MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Discussion {
  _id: string
  title: string
  author: string
  details: string
  tag?: string
  replier: string
  comments: number
  createdAt: string
}

const tags = ["Machine Learning", "IoT", "UI/UX", "algorithm", "Biology", "more"]

export default function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newTag, setNewTag] = useState("")
  const [newDetails, setNewDetails] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const fetchDiscussions = useCallback(async () => {
    try {
      const res = await fetch("/api/discussions")
      if (res.ok) {
        const data = await res.json()
        setDiscussions(data)
      }
    } catch (error) {
      console.error("Failed to fetch discussions:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDiscussions()
  }, [fetchDiscussions])

  const filteredDiscussions = discussions.filter((disc) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      disc.title.toLowerCase().includes(q) ||
      disc.author.toLowerCase().includes(q) ||
      disc.replier.toLowerCase().includes(q)
    )
  })

  const handleCreateDiscussion = async (e: FormEvent) => {
    e.preventDefault()

    if (!newTitle.trim() || !newDetails.trim()) {
      setFormError("Please provide a title and details for your discussion.")
      return
    }

    try {
      const res = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          details: newDetails.trim(),
          tag: newTag.trim(),
          author: "You",
        }),
      })

      if (res.ok) {
        await fetchDiscussions()
        resetFormState()
      } else {
        setFormError("Failed to create discussion. Please try again.")
      }
    } catch (error) {
      console.error("Error creating discussion:", error)
      setFormError("Failed to create discussion. Please try again.")
    }
  }

  const resetFormState = () => {
    setNewTitle("")
    setNewTag("")
    setNewDetails("")
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
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

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

            {/* New Discussion dialog */}
            <Dialog
              open={isCreateOpen}
              onOpenChange={(open) => {
                setIsCreateOpen(open)
                // Clear any previous validation errors when dialog is opened or closed
                if (!open) {
                  setNewTitle("")
                  setNewTag("")
                  setNewDetails("")
                }
                setFormError(null)
              }}
            >
              <DialogTrigger asChild>
                <button className="btn-primary flex items-center gap-2">
                  <Plus size={20} /> Ask New
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Start a new discussion</DialogTitle>
                  <DialogDescription>
                    Ask a clear question or share an idea to get better answers from the community.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateDiscussion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. How to get started with Machine Learning projects?"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Tag</label>
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="e.g. Machine Learning, IoT, UI/UX"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newDetails}
                      onChange={(e) => setNewDetails(e.target.value)}
                      placeholder="Describe your question or idea. Include what you have tried, screenshots, or links if needed."
                      className="w-full min-h-[120px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      required
                    />
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
                      Post discussion
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading discussions...</div>
            ) : filteredDiscussions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No discussions found. Create one!</div>
            ) : (
              filteredDiscussions.map((disc) => (
                <div
                  key={disc._id}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover-lift cursor-pointer transition-all duration-300 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                          {disc.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{disc.title}</h3>
                          <p className="text-sm text-gray-600">
                            {disc.author} · {formatTime(disc.createdAt)} · {disc.replier}
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
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
