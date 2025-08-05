'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar,
  TrendingUp,
  Target,
  Flame,
  Clock,
  CheckCircle,
  ChevronRight,
  Award,
  Dumbbell,
  UtensilsCrossed,
  Users,
  Zap,
  Heart,
  Camera,
  Plus
} from 'lucide-react'

// Mock data - kommer från Supabase senare
const mockUserData = {
  name: 'Anna',
  currentWeight: 68,
  targetWeight: 65,
  streak: 12,
  totalWorkouts: 47,
  totalMeals: 156,
  points: 2840,
  weeklyGoal: 5,
  completedWorkouts: 3
}

const mockTodaySchedule = {
  workout: {
    id: 1,
    name: 'Överkropp styrka',
    duration: 45,
    exercises: 8,
    completed: false,
    scheduledTime: '18:00'
  },
  meals: [
    { id: 1, name: 'Havregröt med bär', time: '07:00', calories: 320, completed: true },
    { id: 2, name: 'Kycklingsallad', time: '12:00', calories: 450, completed: true },
    { id: 3, name: 'Protein smoothie', time: '15:30', calories: 280, completed: false },
    { id: 4, name: 'Lax med quinoa', time: '19:00', calories: 520, completed: false }
  ]
}

const mockWeeklyStats = [
  { day: 'Mån', workout: true, meals: 4 },
  { day: 'Tis', workout: true, meals: 4 },
  { day: 'Ons', workout: false, meals: 3 },
  { day: 'Tor', workout: true, meals: 4 },
  { day: 'Fre', workout: false, meals: 4 },
  { day: 'Lör', workout: false, meals: 2 },
  { day: 'Sön', workout: false, meals: 0 }
]

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date()
      const hour = now.getHours()
      
      // Sätt hälsning baserat på tid
      if (hour < 6) setGreeting('God natt')
      else if (hour < 12) setGreeting('God morgon')
      else if (hour < 17) setGreeting('God dag')
      else if (hour < 22) setGreeting('God kväll')
      else setGreeting('God natt')
      
      // Sätt tid
      setCurrentTime(now.toLocaleTimeString('sv-SE', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }))
    }

    updateTimeAndGreeting()
    const interval = setInterval(updateTimeAndGreeting, 60000) // Uppdatera varje minut
    
    return () => clearInterval(interval)
  }, [])

  const completedMeals = mockTodaySchedule.meals.filter(meal => meal.completed).length
  const totalCalories = mockTodaySchedule.meals.reduce((sum, meal) => sum + meal.calories, 0)
  const consumedCalories = mockTodaySchedule.meals
    .filter(meal => meal.completed)
    .reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 lg:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {greeting}, {mockUserData.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {new Date().toLocaleDateString('sv-SE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Camera className="h-4 w-4" />
                <span className="text-sm font-medium">Logga måltid</span>
              </button>
              <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Snabbstart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Flame className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockUserData.streak}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Dagars streak</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockUserData.currentWeight}kg</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nuvarande vikt</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockUserData.points.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Poäng</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUserData.completedWorkouts}/{mockUserData.weeklyGoal}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Veckans mål</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vänster kolumn */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dagens schema */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dagens schema</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Träning */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Dumbbell className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{mockTodaySchedule.workout.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {mockTodaySchedule.workout.duration} min • {mockTodaySchedule.workout.exercises} övningar • {mockTodaySchedule.workout.scheduledTime}
                    </p>
                  </div>
                  <Link href={`/dashboard/workouts/${mockTodaySchedule.workout.id}`}>
                    <button className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      Starta
                    </button>
                  </Link>
                </div>

                {/* Måltider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Måltider</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {completedMeals}/{mockTodaySchedule.meals.length} klara
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {mockTodaySchedule.meals.map((meal) => (
                      <div key={meal.id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        meal.completed 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                          : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          meal.completed
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                          {meal.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <UtensilsCrossed className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${meal.completed ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'}`}>
                            {meal.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {meal.time} • {meal.calories} kcal
                          </p>
                        </div>
                        {!meal.completed && (
                          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                            Logga
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Veckoöversikt */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Denna vecka</h2>
                  <Link href="/dashboard/progress" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
                    Se mer <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2">
                  {mockWeeklyStats.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">{day.day}</p>
                      <div className="space-y-1">
                        <div className={`w-full h-8 rounded-lg flex items-center justify-center ${
                          day.workout 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
                            : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                        }`}>
                          <Dumbbell className={`h-4 w-4 ${day.workout ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className={`w-full h-1 rounded-full ${
                              i < day.meals 
                                ? 'bg-green-400' 
                                : 'bg-gray-200 dark:bg-gray-600'
                            }`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Höger kolumn */}
          <div className="space-y-6">
            
            {/* Kalorier idag */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kalorier idag</h3>
                
                <div className="relative">
                  <div className="w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Bakgrundscirkel */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200 dark:text-gray-600"
                      />
                      {/* Progress cirkel */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(consumedCalories / totalCalories) * 251.2} 251.2`}
                        className="text-green-500 transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{consumedCalories}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">av {totalCalories}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round((consumedCalories / totalCalories) * 100)}% av dagens mål
                  </p>
                </div>
              </div>
            </div>

            {/* Snabblänkar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Snabblänkar</h3>
                
                <div className="space-y-3">
                  <Link href="/dashboard/workouts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Nya träningspass</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hitta fler övningar</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </Link>

                  <Link href="/dashboard/meals/log" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Camera className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Logga måltid</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Foto eller text</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </Link>

                  <Link href="/dashboard/progress" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">Mina framsteg</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Statistik & grafer</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Motiverande citat */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-6 w-6" />
                <h3 className="font-semibold">Dagens motivation</h3>
              </div>
              <p className="text-blue-100 italic">
                "Varje steg framåt, oavsett hur liten, är framsteg mot ditt mål. Du klarar det här!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
