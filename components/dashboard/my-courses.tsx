"use client"

const courses = [
  { title: "Introduction to lorem ipsum...", progress: 65, color: "#c084fc" },
  { title: "English for today", progress: 45, color: "#93c5fd" },
  { title: "Basic of Lorem ipsum color...", progress: 30, color: "#67e8f9" },
]

export default function MyCourses() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">My Courses</h3>
      <div className="space-y-4">
        {courses.map((course, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: course.color, opacity: 0.2 }}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-500">{course.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
