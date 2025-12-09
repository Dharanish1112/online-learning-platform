"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function LiveLessonsPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date(2023, 7, 14))

  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"]
  const days = ["Mon 14/08", "Tue 15/08", "Wed 16/08", "Thu 17/08", "Fri 18/08", "Sat 19/08", "Sun 20/08"]

  const slots = [
    { day: 1, time: "8:00 AM", duration: "8:00am - 8:45am", seats: null },
    { day: 0, time: "9:00 AM", duration: "9:00am - 10:45am", seats: null },
    { day: 2, time: "10:00 AM", duration: "10:00am - 11:45am", seats: null },
    { day: 1, time: "8:00 AM", duration: "8:00am - 8:45am", seats: 2 },
    { day: 3, time: "10:00 AM", duration: "10:00am - 10:45am", seats: null },
    { day: 3, time: "11:00 AM", duration: "11:00am - 11:45am", seats: null },
    { day: 4, time: "10:00 AM", duration: "10:15am - 10:45am", seats: 9 },
  ]

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 space-y-8">
          {/* Upcoming Lessons */}
          <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Lessons</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 text-lg">You don't have any lesson scheduled yet.</p>
            </div>
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
                      const slotData = slots.find((s) => s.day === day && s.time === slot)
                      return (
                        <div
                          key={`${day}-${slot}`}
                          className={`p-3 rounded-lg text-center text-sm font-medium cursor-pointer transition-all duration-300 hover:shadow-md ${
                            slotData
                              ? slotData.seats
                                ? "bg-blue-200 text-blue-700 border-2 border-blue-400"
                                : "bg-blue-100 text-blue-600 border-2 border-blue-300"
                              : "bg-gray-50 text-gray-400 border border-gray-300"
                          }`}
                        >
                          {slotData ? slotData.duration : ""}
                          {slotData?.seats && <div className="text-xs mt-1">{slotData.seats} seats left</div>}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
