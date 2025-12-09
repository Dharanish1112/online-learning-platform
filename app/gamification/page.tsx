"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { achievements, leaderboard, type UserProfile } from "@/lib/course-data"
import { Trophy, Zap, Target, Medal } from "lucide-react"

const currentUser: UserProfile = {
  id: "user-1",
  name: "You (Current User)",
  email: "user@olip.com",
  level: 8,
  points: 2845,
  streak: 5,
  achievements: achievements,
}

export default function GamificationPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gamification Hub</h1>
            <p className="text-gray-600">Track your progress, earn badges, and climb the leaderboard</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp hover-lift">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">Current Level</h3>
                <div className="text-3xl">📊</div>
              </div>
              <p className="text-3xl font-bold text-blue-600">{currentUser.level}</p>
              <p className="text-sm text-gray-500 mt-2">950 / 1000 XP to next level</p>
            </div>

            <div
              className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp hover-lift"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">Total Points</h3>
                <Zap className="text-yellow-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{currentUser.points}</p>
              <p className="text-sm text-gray-500 mt-2">+245 this week</p>
            </div>

            <div
              className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp hover-lift"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">Current Streak</h3>
                <span className="text-3xl">🔥</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">{currentUser.streak}</p>
              <p className="text-sm text-gray-500 mt-2">days in a row</p>
            </div>

            <div
              className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp hover-lift"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-600">Leaderboard Rank</h3>
                <Trophy className="text-purple-500" size={24} />
              </div>
              <p className="text-3xl font-bold text-purple-600">#4</p>
              <p className="text-sm text-gray-500 mt-2">out of 1,234 students</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Achievements */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Medal size={28} className="text-yellow-500" /> Achievements & Badges
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {achievements.map((achievement, i) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl text-center transition-all hover-lift animate-fadeInUp ${
                        achievement.unlocked
                          ? `${achievement.color} text-white shadow-lg`
                          : "bg-gray-100 text-gray-500 opacity-50"
                      }`}
                      style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="font-bold text-sm mb-1">{achievement.name}</h3>
                      <p className="text-xs opacity-90 mb-2">{achievement.description}</p>
                      {achievement.unlocked && achievement.unlockedDate && (
                        <p className="text-xs opacity-75">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-gray-700">
                    You have unlocked{" "}
                    <span className="font-bold text-blue-600">{achievements.filter((a) => a.unlocked).length}</span> out
                    of <span className="font-bold text-gray-900">{achievements.length}</span> achievements
                  </p>
                </div>
              </div>
            </div>

            {/* Progress to Next Achievements */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-green-500" /> Next Milestones
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Week Warrior</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "71%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">5 / 7 days (2 days remaining)</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Course Collector</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-purple-500" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">3 / 5 courses enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl p-8 shadow-sm animate-fadeInUp mt-8" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy size={28} className="text-yellow-500" /> Global Leaderboard
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Points</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Level</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition animate-fadeInUp ${
                        user.isCurrentUser ? "bg-blue-50" : ""
                      }`}
                      style={{ animationDelay: `${0.6 + i * 0.05}s` }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : ""}
                          </span>
                          <span className="font-bold text-gray-900">#{user.rank}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{user.image}</span>
                          <div>
                            <p className={`font-semibold ${user.isCurrentUser ? "text-blue-600" : "text-gray-900"}`}>
                              {user.name}
                              {user.isCurrentUser && (
                                <span className="text-xs ml-2 bg-blue-200 text-blue-800 px-2 py-0.5 rounded">YOU</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-yellow-600">{user.points}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          Level {user.level}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">🔥</span>
                          <span className="font-semibold text-orange-600">{user.streak}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
