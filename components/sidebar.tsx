"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, BookOpen, MessageCircle, Lightbulb, Radio, Zap } from "lucide-react"

const navigationItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/courses", icon: BookOpen, label: "My Courses" },
  { href: "/discussions", icon: MessageCircle, label: "Discussions" },
  { href: "/prototypes", icon: Lightbulb, label: "Prototypes" },
  { href: "/live-lessons", icon: Radio, label: "Live Lessons" },
  { href: "/catalog", icon: Zap, label: "Course Catalog" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-24 bg-gradient-to-b from-[#1a3d5c] to-[#0f2940] flex flex-col items-center py-8 gap-8 shadow-xl">
      {/* Logo */}
      <Link href="/dashboard" className="text-white text-2xl font-bold hover:text-blue-300 transition-colors">
        ◻
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.includes(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative p-3 rounded-lg transition-all duration-300 group ${
                isActive
                  ? "bg-[#3498db] text-white shadow-lg animate-pulse-glow"
                  : "text-gray-300 hover:text-white hover:bg-[#34495e]"
              }`}
              title={item.label}
            >
              <Icon size={24} />
              <div className="absolute left-24 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Icon */}
      <button className="p-3 rounded-lg text-purple-400 hover:text-purple-300 transition-colors hover:bg-[#34495e]">
        <Zap size={24} />
      </button>
    </aside>
  )
}
