"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { coursesData } from "@/lib/course-data"
import { ChevronLeft, Play, BookOpen, Award, Users, Star, Clock } from "lucide-react"

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const course = coursesData.find((c) => c.id === courseId)
  const [activeLesson, setActiveLesson] = useState(0)

  if (!course) {
    return (
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar />
        <main className="flex-1 ml-24">
          <Header />
          <div className="p-8">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const currentLesson = course.lessons[activeLesson]

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 animate-fadeInUp">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
            >
              <ChevronLeft size={20} /> Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Users size={16} /> {course.students.toLocaleString()} students
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} /> {course.rating} rating
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} /> {course.duration}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Section */}
              <div
                className={`rounded-xl p-8 mb-8 h-80 flex items-center justify-center text-6xl animate-fadeInUp ${
                  course.dark ? "bg-[#1a3d5c]" : "bg-gradient-to-br from-blue-100 to-blue-50"
                }`}
              >
                <Play size={64} className="text-blue-500 opacity-50" />
              </div>

              {/* Lesson Content */}
              <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-6">Duration: {currentLesson.duration} minutes</p>
                <div className="prose prose-sm max-w-none text-gray-700 mb-8">
                  <p>{currentLesson.content}</p>
                </div>

                {/* Lesson Navigation */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                    disabled={activeLesson === 0}
                    className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition"
                  >
                    Previous Lesson
                  </button>
                  {activeLesson < course.lessons.length - 1 ? (
                    <button
                      onClick={() => setActiveLesson(activeLesson + 1)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ml-auto"
                    >
                      Next Lesson
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push(`/quiz/${course.id}`)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition ml-auto flex items-center gap-2"
                    >
                      <Award size={16} /> Take Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-bold text-gray-900 mb-4">Course Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Instructor:</span>{" "}
                    <span className="font-medium text-gray-900">{course.instructor}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Level:</span>{" "}
                    <span className="font-medium text-gray-900">{course.level}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Lessons:</span>{" "}
                    <span className="font-medium text-gray-900">{course.lessons.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Quizzes:</span>{" "}
                    <span className="font-medium text-gray-900">{course.quizzes.length}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-bold text-gray-900 mb-4">Your Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="h-3 rounded-full bg-blue-500 transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{course.progress}% Complete</p>
              </div>

              {/* Lessons List */}
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                <h3 className="font-bold text-gray-900 mb-4">Lessons</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {course.lessons.map((lesson, i) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(i)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeLesson === i ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <p className="text-xs opacity-70 mt-1">{lesson.duration} min</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
