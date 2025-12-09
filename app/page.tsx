"use client"
import { useRouter } from "next/navigation"
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3d5c] via-[#0f2940] to-[#1a3d5c] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-smooth"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow"
          style={{ animationDuration: "15s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-8 py-6">
          <div className="text-3xl font-bold">◻OLP</div>
          <button onClick={() => router.push("/dashboard")} className="btn-primary">
            Get Started
          </button>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Learn, Build & <span className="text-blue-400">Innovate</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Join thousands of students mastering cutting-edge technologies including Machine Learning, IoT, Web
                Development, and more.
              </p>
              <div className="flex gap-4 pt-8">
                <button onClick={() => router.push("/dashboard")} className="btn-primary flex items-center gap-2">
                  Start Learning <ArrowRight size={20} />
                </button>
                <button className="btn-secondary">Watch Demo</button>
              </div>
            </div>

            <div className="animate-slideInRight">
              <div className="relative h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                <div className="relative space-y-4">
                  <div className="h-12 bg-white/20 rounded-lg animate-fadeInUp" style={{ animationDelay: "0s" }}></div>
                  <div
                    className="h-12 bg-white/20 rounded-lg animate-fadeInUp"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="h-12 bg-white/20 rounded-lg animate-fadeInUp"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {[
              { icon: BookOpen, title: "500+ Courses", desc: "Learn from expert instructors" },
              { icon: Users, title: "Active Community", desc: "Connect and collaborate with peers" },
              { icon: Zap, title: "Live Sessions", desc: "Real-time learning experiences" },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover-lift animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="text-blue-400 mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
