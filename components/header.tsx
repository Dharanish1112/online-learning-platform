"use client"
import { Search, Bell, Settings } from "lucide-react"

export default function Header() {
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
          <Bell className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" size={20} />
          <Settings className="text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" size={20} />
        </div>
      </div>
    </header>
  )
}
