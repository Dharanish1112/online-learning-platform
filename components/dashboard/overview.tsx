"use client"
import { BookOpen, Zap, Clock, Trophy } from "lucide-react"

const stats = [
  { icon: BookOpen, label: "Courses in progress", value: "3" },
  { icon: Zap, label: "Active Prototypes", value: "7" },
  { icon: Clock, label: "Hours Learning", value: "3h 15m" },
  { icon: Trophy, label: "Community score", value: "240" },
]

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover-lift" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <stat.icon className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <p className="text-gray-600 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
