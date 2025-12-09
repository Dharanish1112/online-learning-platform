"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "SAT", hours: 2 },
  { day: "SUN", hours: 3 },
  { day: "MON", hours: 2.5 },
  { day: "TUE", hours: 4 },
  { day: "WED", hours: 4.5 },
  { day: "THU", hours: 2.5 },
  { day: "FRI", hours: 2.5 },
]

export default function StudyStats() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Study Statistics</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">week</button>
          <button className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">month</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip cursor={{ fill: "rgba(52, 152, 219, 0.1)" }} />
          <Bar dataKey="hours" fill="#3498db" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
