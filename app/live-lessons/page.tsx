"use client"

import { useState, useEffect, useCallback } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ChevronLeft, ChevronRight, Calendar, Clock, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ScheduledLesson {
  _id: string
  day: number
  dayLabel: string
  time: string
  duration: string
  topic: string
  notes: string
}

interface SlotData {
  day: number
  time: string
  duration: string
  seats: number | null
}

export default function LiveLessonsPage() {
  const [currentWeek] = useState(new Date(2023, 7, 14))

  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"]
  const days = ["Mon 14/08", "Tue 15/08", "Wed 16/08", "Thu 17/08", "Fri 18/08", "Sat 19/08", "Sun 20/08"]

  const availableSlots: SlotData[] = [
    { day: 1, time: "8:00 AM", duration: "8:00am - 8:45am", seats: null },
    { day: 0, time: "9:00 AM", duration: "9:00am - 10:45am", seats: null },
    { day: 2, time: "10:00 AM", duration: "10:00am - 11:45am", seats: null },
    { day: 3, time: "10:00 AM", duration: "10:00am - 10:45am", seats: null },
    { day: 3, time: "11:00 AM", duration: "11:00am - 11:45am", seats: null },
    { day: 4, time: "10:00 AM", duration: "10:15am - 10:45am", seats: 9 },
    { day: 5, time: "9:00 AM", duration: "9:00am - 9:45am", seats: null },
    { day: 6, time: "10:00 AM", duration: "10:00am - 10:45am", seats: null },
  ]

  // State for scheduled lessons
  const [scheduledLessons, setScheduledLessons] = useState<ScheduledLesson[]>([])
  const [loading, setLoading] = useState(true)

  // State for booking dialog
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null)
  const [selectedDayLabel, setSelectedDayLabel] = useState("")
  const [topic, setTopic] = useState("")
  const [notes, setNotes] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const fetchLessons = useCallback(async () => {
    try {
      const res = await fetch("/api/lessons")
      if (res.ok) {
        const data = await res.json()
        setScheduledLessons(data)
      }
    } catch (error) {
      console.error("Failed to fetch lessons:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  const handleSlotClick = (slotData: SlotData, dayLabel: string) => {
    // Check if already booked
    const alreadyBooked = scheduledLessons.some(
      (lesson) => lesson.day === slotData.day && lesson.time === slotData.time
    )
    if (alreadyBooked) return

    setSelectedSlot(slotData)
    setSelectedDayLabel(dayLabel)
    setIsBookingOpen(true)
  }

  const handleBookLesson = async () => {
    if (!topic.trim()) {
      setFormError("Please enter a topic for your lesson.")
      return
    }

    if (!selectedSlot) return

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: selectedSlot.day,
          dayLabel: selectedDayLabel,
          time: selectedSlot.time,
          duration: selectedSlot.duration,
          topic: topic.trim(),
          notes: notes.trim(),
        }),
      })

      if (res.ok) {
        await fetchLessons()
        resetBookingState()
      } else {
        setFormError("Failed to book lesson. Please try again.")
      }
    } catch (error) {
      console.error("Error booking lesson:", error)
      setFormError("Failed to book lesson. Please try again.")
    }
  }

  const handleCancelLesson = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/lessons/${lessonId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        await fetchLessons()
      }
    } catch (error) {
      console.error("Error canceling lesson:", error)
    }
  }

  const resetBookingState = () => {
    setSelectedSlot(null)
    setSelectedDayLabel("")
    setTopic("")
    setNotes("")
    setFormError(null)
    setIsBookingOpen(false)
  }

  const isSlotBooked = (day: number, time: string) => {
    return scheduledLessons.some((lesson) => lesson.day === day && lesson.time === time)
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 space-y-8">
          {/* Upcoming Lessons */}
          <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Lessons</h2>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading lessons...</div>
            ) : scheduledLessons.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <p className="text-gray-500 text-lg">You don't have any lesson scheduled yet.</p>
                <p className="text-gray-400 text-sm mt-2">Click on an available slot below to schedule a lesson.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scheduledLessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 relative group"
                  >
                    <button
                      onClick={() => handleCancelLesson(lesson._id)}
                      className="absolute top-3 right-3 p-1 rounded-full bg-white/80 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      title="Cancel lesson"
                    >
                      <X size={16} />
                    </button>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                      <Calendar size={16} />
                      <span>{lesson.dayLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                      <Clock size={14} />
                      <span>{lesson.duration}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{lesson.topic}</h3>
                    {lesson.notes && <p className="text-sm text-gray-500">{lesson.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Lesson */}
          <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule a lesson</h2>
            <p className="text-gray-600 mb-6">
              Available Slots <span className="text-gray-500">(N.B. time set to GMT+1)</span>
            </p>

            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-900">Aug 14 - 20, 2023</span>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Time Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-max">
                {/* Days Header */}
                <div className="grid gap-px mb-4" style={{ gridTemplateColumns: "100px repeat(7, 150px)" }}>
                  <div></div>
                  {days.map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className="grid gap-px mb-4"
                    style={{ gridTemplateColumns: "100px repeat(7, 150px)" }}
                  >
                    <div className="text-sm font-medium text-gray-600 text-right pr-4">{slot}</div>
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const slotData = availableSlots.find((s) => s.day === day && s.time === slot)
                      const booked = isSlotBooked(day, slot)
                      return (
                        <div
                          key={`${day}-${slot}`}
                          onClick={() => slotData && !booked && handleSlotClick(slotData, days[day])}
                          className={`p-3 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                            booked
                              ? "bg-green-100 text-green-700 border-2 border-green-400 cursor-default"
                              : slotData
                                ? slotData.seats
                                  ? "bg-blue-200 text-blue-700 border-2 border-blue-400 cursor-pointer hover:shadow-md hover:scale-105"
                                  : "bg-blue-100 text-blue-600 border-2 border-blue-300 cursor-pointer hover:shadow-md hover:scale-105"
                                : "bg-gray-50 text-gray-400 border border-gray-300 cursor-default"
                          }`}
                        >
                          {booked ? "✓ Booked" : slotData ? slotData.duration : ""}
                          {slotData?.seats && !booked && <div className="text-xs mt-1">{slotData.seats} seats left</div>}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Dialog */}
        <Dialog
          open={isBookingOpen}
          onOpenChange={(open) => {
            if (!open) resetBookingState()
            else setIsBookingOpen(open)
          }}
        >
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Schedule Your Lesson</DialogTitle>
              <DialogDescription>
                Book the selected time slot for your live lesson.
              </DialogDescription>
            </DialogHeader>

            {selectedSlot && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Calendar size={18} />
                  <span>{selectedDayLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 text-sm mt-1">
                  <Clock size={16} />
                  <span>{selectedSlot.duration}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lesson Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. React Hooks Deep Dive, ML Model Training, etc."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific topics to cover, questions to ask, or preparation notes..."
                  className="w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              {formError && <p className="text-sm text-red-500">{formError}</p>}
            </div>

            <DialogFooter className="pt-4">
              <button
                type="button"
                onClick={resetBookingState}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBookLesson}
                className="px-4 py-2 rounded-md bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
