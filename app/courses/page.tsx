"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ChevronLeft, ChevronRight, Calendar, Clock, BookmarkCheck } from "lucide-react"
import { coursesData } from "@/lib/course-data"

export default function CoursesPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 8))

  const courseProgress = coursesData.slice(0, 4).map((course) => ({
    id: course.id,
    title: course.title,
    progress: course.progress,
    lessons: course.lessons.length,
    quizzes: course.quizzes.length,
    completed: course.progress === 100,
  }))

  const upcomingTasks = [{ title: "Assignment 04", desc: "Nisi, venenatis id cursus", date: "Oct 02, 2022" }]

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 space-y-8">
          {/* Progress Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress</h2>
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl p-12 relative overflow-hidden min-h-[300px] flex flex-col justify-center items-center">
              <div className="text-6xl mb-4">🌳</div>
              <div className="w-64 h-2 bg-purple-400 rounded-full my-6"></div>
              <span className="text-2xl font-bold text-purple-900">30%</span>
              <div className="absolute top-4 right-4 text-5xl">🏆</div>
              <span className="text-gray-700 mt-4">Beginner</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enrolled Courses */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Enrolled Courses</h3>
                <div className="space-y-4">
                  {courseProgress.map((course, i) => (
                    <div
                      key={course.id}
                      onClick={() => router.push(`/course/${course.id}`)}
                      className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow hover-lift cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">Progress</p>
                        </div>
                        {course.completed && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
                        <div
                          className="h-2 rounded-full transition-all duration-500 bg-blue-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">📚 {course.lessons} lessons</span>
                        <span className="flex items-center gap-1">❓ {course.quizzes} quizzes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Calendar & Tasks */}
            <div className="space-y-6">
              {/* Calendar */}
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-600 mb-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded ${i === 1 || i === 2 ? "bg-blue-500 text-white font-bold" : "text-gray-600 hover:bg-gray-100"}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" /> Due Date
                </h4>
                {upcomingTasks.map((task, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-500 text-white rounded-lg">
                        <BookmarkCheck size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{task.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{task.desc}</p>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                          <Clock size={14} /> {task.date}
                        </p>
                      </div>
                    </div>
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
