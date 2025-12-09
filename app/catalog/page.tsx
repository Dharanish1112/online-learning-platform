"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { coursesData } from "@/lib/course-data"
import { useRouter } from "next/navigation"
import { BookOpen } from "lucide-react"

const filters = ["All", "Beginner", "Intermediate", "Advanced"]

export default function CatalogPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredCourses = activeFilter === "All" ? coursesData : coursesData.filter((c) => c.level === activeFilter)

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
            <p className="text-gray-600">My Courses / catalog</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-8 flex-wrap animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course, i) => (
              <div
                key={course.id}
                className="animate-fadeInUp hover-lift cursor-pointer"
                onClick={() => router.push(`/course/${course.id}`)}
                style={{ animationDelay: `${(i % 4) * 0.1}s` }}
              >
                <div
                  className={`rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                    course.dark ? "bg-[#1a3d5c] text-white" : "bg-white"
                  }`}
                >
                  <div
                    className={`h-48 ${course.dark ? "bg-[#0f2940]" : "bg-gradient-to-br from-blue-100 to-blue-50"} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="text-6xl">👨‍💻</div>
                    <div
                      className={`absolute top-3 right-3 ${course.featured ? "block" : "hidden"} bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold`}
                    >
                      Featured
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`font-bold text-lg mb-2 ${course.dark ? "text-white" : "text-gray-900"}`}>
                        {course.title}
                      </h3>
                      <p className={`text-sm mb-4 ${course.dark ? "text-gray-300" : "text-gray-600"}`}>
                        {course.description.substring(0, 60)}...
                      </p>
                    </div>
                    <div>
                      <div
                        className={`flex items-center gap-2 text-xs mb-4 ${course.dark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-500"></div>
                        <span>{course.instructor}</span>
                        <span>·</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <BookOpen size={16} />
                        <span>{course.lessons.length} lessons</span>
                        <span>·</span>
                        <span>{course.quizzes.length} quizzes</span>
                      </div>
                    </div>
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
