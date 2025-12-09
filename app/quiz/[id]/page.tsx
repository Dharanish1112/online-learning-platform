"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { coursesData } from "@/lib/course-data"
import { ChevronLeft, Award, RotateCcw } from "lucide-react"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const course = coursesData.find((c) => c.id === courseId)
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: string; selected: number; correct: number }[]>([])

  if (!course || course.quizzes.length === 0) {
    return (
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar />
        <main className="flex-1 ml-24">
          <Header />
          <div className="p-8">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900">Quiz not found</h1>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const currentQuiz = course.quizzes[currentQuizIndex]
  const currentQuestion = currentQuiz.questions[currentQuestionIndex]
  const totalQuestions = currentQuiz.questions.length
  const answeredCount = answers.length

  const handleAnswer = (optionIndex: number) => {
    if (answered) return

    setSelectedAnswer(optionIndex)
    const isCorrect = optionIndex === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore(score + 10)
    }
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selected: optionIndex,
        correct: currentQuestion.correctAnswer,
      },
    ])
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswered(false)
      setSelectedAnswer(null)
    } else if (currentQuizIndex < course.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
      setCurrentQuestionIndex(0)
      setAnswered(false)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuizIndex(0)
    setCurrentQuestionIndex(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setAnswers([])
  }

  const correctAnswers = answers.filter((a, i) => a.correct === a.selected).length
  const percentage = Math.round((correctAnswers / answers.length) * 100)

  if (quizCompleted) {
    const earnedPoints = Math.round((correctAnswers / answers.length) * 100)
    const badges = earnedPoints === 100 ? ["Perfect Score!", "Quiz Master!"] : earnedPoints >= 80 ? ["Great Job!"] : []

    return (
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar />
        <main className="flex-1 ml-24">
          <Header />
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
              >
                <ChevronLeft size={20} /> Back
              </button>

              <div className="bg-white rounded-xl p-12 shadow-sm text-center animate-fadeInUp">
                <div className="text-6xl mb-6">
                  {percentage === 100 ? "🎉" : percentage >= 80 ? "🎊" : percentage >= 60 ? "👍" : "📚"}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
                <p className="text-gray-600 mb-8">Great effort in completing the quiz</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">
                      {correctAnswers}/{answers.length}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Correct Answers</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-purple-600">{percentage}%</p>
                    <p className="text-sm text-gray-600 mt-1">Score</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-green-600">+{earnedPoints}</p>
                    <p className="text-sm text-gray-600 mt-1">Points Earned</p>
                  </div>
                </div>

                {badges.length > 0 && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
                    <h3 className="font-bold text-gray-900 mb-3">Badges Unlocked!</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {badges.map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                          <span className="text-xl">🏆</span>
                          <span className="font-semibold text-gray-900">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                  >
                    <RotateCcw size={16} /> Retake Quiz
                  </button>
                  <button
                    onClick={() => router.push("/gamification")}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                  >
                    <Award size={16} /> View Achievements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fadeInUp">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
              >
                <ChevronLeft size={20} /> Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm animate-slideInRight">
              <h2 className="text-xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedAnswer === i
                  const isCorrect = i === currentQuestion.correctAnswer
                  const isWrong = isSelected && !isCorrect

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={answered}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        !answered && !isSelected
                          ? "border-gray-200 hover:border-blue-400 bg-white"
                          : isSelected && isCorrect
                            ? "border-green-500 bg-green-50"
                            : isWrong
                              ? "border-red-500 bg-red-50"
                              : isCorrect && answered
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 bg-white"
                      } ${answered ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-1 ${
                            isSelected && isCorrect
                              ? "bg-green-500 border-green-500 text-white"
                              : isWrong
                                ? "bg-red-500 border-red-500 text-white"
                                : isCorrect && answered
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-gray-300"
                          }`}
                        >
                          {isSelected || (isCorrect && answered)
                            ? isCorrect || isSelected
                              ? "✓"
                              : "✗"
                            : String.fromCharCode(65 + i)}
                        </div>
                        <span
                          className={`text-base ${
                            isSelected && isCorrect
                              ? "text-green-900 font-semibold"
                              : isWrong
                                ? "text-red-900"
                                : isCorrect && answered
                                  ? "text-green-900 font-semibold"
                                  : "text-gray-900"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {answered && (
                <div
                  className={`p-4 rounded-lg mb-8 animate-fadeInUp ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "bg-blue-50 border-l-4 border-blue-500"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Learn:"}
                  </p>
                  <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Navigation */}
              {!answered ? (
                <div className="text-center text-gray-500 text-sm">Select an answer to continue</div>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                >
                  {currentQuestionIndex === totalQuestions - 1 && currentQuizIndex === course.quizzes.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
