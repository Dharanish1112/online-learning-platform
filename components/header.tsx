"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, Bell, Settings, X, Database } from "lucide-react"

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, title: "New reply to your discussion", desc: "Nahin replied to 'React vs Vue'", time: "2 min ago", unread: true },
    { id: 2, title: "Lesson reminder", desc: "Your lesson starts in 30 minutes", time: "25 min ago", unread: true },
    { id: 3, title: "Achievement unlocked!", desc: "You earned 'Week Warrior' badge", time: "1 hour ago", unread: false },
    { id: 4, title: "Course update", desc: "New lesson added to Web Development", time: "3 hours ago", unread: false },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-fadeInUp">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notif.unread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notif.unread && (
                            <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          )}
                          <div className={notif.unread ? "" : "ml-5"}>
                            <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{notif.desc}</p>
                            <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center">
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Database Preview */}
          <Link
            href="/database-preview"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Database Preview"
          >
            <Database size={20} />
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}
