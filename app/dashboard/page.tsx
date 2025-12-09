"use client"
import Sidebar from "@/components/sidebar"
import DashboardOverview from "@/components/dashboard/overview"
import StudyStats from "@/components/dashboard/study-stats"
import MyCourses from "@/components/dashboard/my-courses"
import Header from "@/components/header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 space-y-8">
          <DashboardOverview />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <StudyStats />
            </div>
            <div>
              <MyCourses />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
