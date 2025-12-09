export interface Lesson {
  id: string
  title: string
  duration: number
  content: string
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  rating: number
  students: number
  duration: string
  level: string
  lessons: Lesson[]
  quizzes: Quiz[]
  progress: number
  dark: boolean
  featured?: boolean
  image?: string
}

export const coursesData: Course[] = [
  {
    id: "1",
    title: "Basic of English Language",
    description: "Master the fundamentals of English language with interactive lessons and quizzes",
    instructor: "Shams Tabrez",
    rating: 4.8,
    students: 2543,
    duration: "4 weeks",
    level: "Beginner",
    progress: 67,
    dark: false,
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Grammar",
        duration: 15,
        content: "Learn the basics of English grammar including parts of speech, tenses, and sentence structure.",
      },
      {
        id: "1-2",
        title: "Vocabulary Building",
        duration: 20,
        content: "Expand your vocabulary with practical words and phrases used in daily conversations.",
      },
      {
        id: "1-3",
        title: "Conversational English",
        duration: 25,
        content: "Practice speaking English in real-world scenarios and improve your communication skills.",
      },
    ],
    quizzes: [
      {
        id: "1-q1",
        title: "Grammar Basics Quiz",
        questions: [
          {
            id: "1-q1-1",
            question: "Which of the following is a noun?",
            options: ["run", "happy", "book", "quickly"],
            correctAnswer: 2,
            explanation: "'Book' is a noun as it is a person, place, or thing.",
          },
          {
            id: "1-q1-2",
            question: "What is the past tense of 'go'?",
            options: ["going", "went", "goes", "goed"],
            correctAnswer: 1,
            explanation: "The past tense of 'go' is 'went'.",
          },
          {
            id: "1-q1-3",
            question: "Which sentence is correct?",
            options: ["She go to school", "She goes to school", "She going to school", "She gone to school"],
            correctAnswer: 1,
            explanation: "The correct form is 'She goes to school' (simple present tense).",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Introduction to Web Development",
    description: "Build modern web applications from scratch with HTML, CSS, and JavaScript",
    instructor: "Shams Tabrez",
    rating: 4.9,
    students: 3214,
    duration: "6 weeks",
    level: "Beginner",
    progress: 0,
    dark: true,
    lessons: [
      {
        id: "2-1",
        title: "HTML Fundamentals",
        duration: 30,
        content: "Learn the structure of web pages using HTML5 semantic elements.",
      },
      {
        id: "2-2",
        title: "CSS Styling",
        duration: 35,
        content: "Master CSS for styling, layouts, and responsive design.",
      },
      {
        id: "2-3",
        title: "JavaScript Basics",
        duration: 40,
        content: "Introduction to JavaScript programming and DOM manipulation.",
      },
      {
        id: "2-4",
        title: "Building Projects",
        duration: 45,
        content: "Apply your knowledge to build real-world web projects.",
      },
    ],
    quizzes: [
      {
        id: "2-q1",
        title: "Web Development Fundamentals",
        questions: [
          {
            id: "2-q1-1",
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Home Tool Markup Language",
              "Hyperlinks and Text Markup Language",
            ],
            correctAnswer: 0,
            explanation: "HTML stands for Hyper Text Markup Language.",
          },
          {
            id: "2-q1-2",
            question: "Which of the following is a block-level element in HTML?",
            options: ["span", "a", "div", "img"],
            correctAnswer: 2,
            explanation: "The 'div' element is a block-level element that takes up full width.",
          },
          {
            id: "2-q1-3",
            question: "What property is used to add space inside an element?",
            options: ["margin", "padding", "border", "spacing"],
            correctAnswer: 1,
            explanation: "'Padding' adds space inside an element, while 'margin' adds space outside.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    description: "Get started with machine learning algorithms and data analysis",
    instructor: "Shams Tabrez",
    rating: 4.7,
    students: 1892,
    duration: "8 weeks",
    level: "Intermediate",
    progress: 0,
    dark: true,
    lessons: [
      {
        id: "3-1",
        title: "ML Introduction",
        duration: 35,
        content: "Understand the fundamentals of machine learning and its applications.",
      },
      {
        id: "3-2",
        title: "Supervised Learning",
        duration: 40,
        content: "Learn about regression and classification algorithms.",
      },
      {
        id: "3-3",
        title: "Unsupervised Learning",
        duration: 40,
        content: "Explore clustering and dimensionality reduction techniques.",
      },
    ],
    quizzes: [
      {
        id: "3-q1",
        title: "Machine Learning Quiz",
        questions: [
          {
            id: "3-q1-1",
            question: "What is the primary goal of machine learning?",
            options: [
              "Write complex code",
              "Learn patterns from data and make predictions",
              "Create databases",
              "Design user interfaces",
            ],
            correctAnswer: 1,
            explanation: "The primary goal of ML is to learn patterns from data and make predictions.",
          },
          {
            id: "3-q1-2",
            question: "What type of learning uses labeled data?",
            options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Transfer learning"],
            correctAnswer: 1,
            explanation: "Supervised learning uses labeled data to train models.",
          },
        ],
      },
    ],
  },
]

// Gamification data
export interface UserAchievement {
  id: string
  name: string
  description: string
  icon: string
  color: string
  unlocked: boolean
  unlockedDate?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  level: number
  points: number
  streak: number
  achievements: UserAchievement[]
}

export const achievements: UserAchievement[] = [
  {
    id: "first-quiz",
    name: "Quiz Master",
    description: "Complete your first quiz",
    icon: "🎯",
    color: "bg-blue-500",
    unlocked: true,
    unlockedDate: "2024-01-15",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: "100",
    color: "bg-yellow-500",
    unlocked: true,
    unlockedDate: "2024-01-20",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    color: "bg-orange-500",
    unlocked: false,
  },
  {
    id: "courses-5",
    name: "Course Collector",
    description: "Enroll in 5 courses",
    icon: "📚",
    color: "bg-green-500",
    unlocked: false,
  },
  {
    id: "helper",
    name: "Community Helper",
    description: "Help 10 students in discussions",
    icon: "🤝",
    color: "bg-purple-500",
    unlocked: false,
  },
  {
    id: "top-student",
    name: "Top Student",
    description: "Rank in top 10 leaderboard",
    icon: "👑",
    color: "bg-red-500",
    unlocked: false,
  },
]

export const leaderboard = [
  { rank: 1, name: "Alex Chen", points: 4850, level: 12, streak: 24, image: "👨‍💼" },
  { rank: 2, name: "Maria Garcia", points: 4620, level: 11, streak: 18, image: "👩‍💼" },
  { rank: 3, name: "James Wilson", points: 4390, level: 11, streak: 15, image: "👨‍💻" },
  { rank: 4, name: "You (Current User)", points: 2845, level: 8, streak: 5, image: "👤", isCurrentUser: true },
  { rank: 5, name: "Sofia Martinez", points: 2760, level: 8, streak: 12, image: "👩‍🎓" },
  { rank: 6, name: "David Kim", points: 2540, level: 7, streak: 8, image: "👨‍🎓" },
]
