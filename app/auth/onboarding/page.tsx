'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Loader2, User, Target, Dumbbell, UtensilsCrossed, Globe, MapPin } from 'lucide-react'

// Typer för onboarding data
interface OnboardingData {
  language: 'sv' | 'en'
  gender: 'male' | 'female' | 'other' | ''
  age: string
  weight: string
  height: string
  country: string
  address: string
  goals: string[]
  workoutTypes: string[]
  preferences: 'meal_plan' | 'workout_plan' | 'both' | ''
  allergies: string
}

const TOTAL_STEPS = 7

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [data, setData] = useState<OnboardingData>({
    language: 'sv',
    gender: '',
    age: '',
    weight: '',
    height: '',
    country: 'Sverige',
    address: '',
    goals: [],
    workoutTypes: [],
    preferences: '',
    allergies: ''
  })

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: 'goals' | 'workoutTypes', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.language !== ''
      case 2: return data.gender !== '' && data.age !== ''
      case 3: return data.weight !== '' && data.height !== ''
      case 4: return data.country !== '' && data.address !== ''
      case 5: return data.goals.length > 0
      case 6: return data.workoutTypes.length > 0
      case 7: return data.preferences !== ''
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      // TODO: Spara onboarding data till Supabase
      // await saveOnboardingData(data)
      
      // Simulation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirecta till dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Välj språk</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Vilket språk föredrar du?</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'sv', label: '🇸🇪 Svenska', desc: 'Använd svenska i appen' },
                { value: 'en', label: '🇬🇧 English', desc: 'Use English in the app' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('language', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    data.language === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{option.label}</span>
                    <div className="text-left">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Om dig</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Berätta lite om dig själv</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Kön
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'female', label: 'Kvinna' },
                    { value: 'male', label: 'Man' },
                    { value: 'other', label: 'Annat' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateData('gender', option.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        data.gender === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ålder
                </label>
                <input
                  id="age"
                  type="number"
                  min="16"
                  max="100"
                  value={data.age}
                  onChange={(e) => updateData('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="25"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">📏</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mått</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Vi behöver dina mått för att skapa en personlig plan</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vikt (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="30"
                  max="300"
                  value={data.weight}
                  onChange={(e) => updateData('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="70"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Längd (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  min="140"
                  max="220"
                  value={data.height}
                  onChange={(e) => updateData('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="170"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Plats</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Var bor du? (för lokala tips och leveranser)</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Land
                </label>
                <select
                  id="country"
                  value={data.country}
                  onChange={(e) => updateData('country', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Sverige">Sverige</option>
                  <option value="Norge">Norge</option>
                  <option value="Danmark">Danmark</option>
                  <option value="Finland">Finland</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stad/Postort
                </label>
                <input
                  id="address"
                  type="text"
                  value={data.address}
                  onChange={(e) => updateData('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Stockholm"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dina mål</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Vad vill du uppnå? (Du kan välja flera)</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'lose_weight', label: 'Gå ner i vikt', desc: 'Minska kroppsvikt och fett' },
                { value: 'build_muscle', label: 'Bygga muskler', desc: 'Öka muskelmassa och styrka' },
                { value: 'stay_healthy', label: 'Bli hälsosam', desc: 'Förbättra allmän hälsa och välbefinnande' },
                { value: 'increase_energy', label: 'Öka energi', desc: 'Få mer energi i vardagen' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayValue('goals', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    data.goals.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border-2 mt-0.5 ${
                      data.goals.includes(option.value)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {data.goals.includes(option.value) && (
                        <svg className="w-3 h-3 text-white ml-0.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Dumbbell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Träningsform</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Vilka träningsformer är du intresserad av?</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'home_workout', label: '🏠 Hemmaträning', desc: 'Träna hemma utan utrustning' },
                { value: 'gym', label: '🏋️ Gym', desc: 'Träning med vikter och maskiner' },
                { value: 'outdoor', label: '🌳 Utomhus', desc: 'Löpning, vandring, cykling' },
                { value: 'swimming', label: '🏊 Simning', desc: 'Simning och vattenträning' },
                { value: 'group_classes', label: '👥 Gruppträning', desc: 'Yoga, spinning, aerobics' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayValue('workoutTypes', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    data.workoutTypes.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded border-2 mt-0.5 ${
                      data.workoutTypes.includes(option.value)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {data.workoutTypes.includes(option.value) && (
                        <svg className="w-3 h-3 text-white ml-0.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <UtensilsCrossed className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vad vill du ha hjälp med?</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Välj vad du vill få personliga planer för</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'meal_plan', label: '🍽️ Endast kostschema', desc: 'Personliga måltidsplaner och recept' },
                { value: 'workout_plan', label: '💪 Endast träningsschema', desc: 'Anpassade träningsprogram' },
                { value: 'both', label: '🎯 Båda delarna', desc: 'Komplett kostschema + träningsschema (rekommenderat)' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('preferences', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    data.preferences === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                      data.preferences === option.value
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {data.preferences === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allergier och matpreferenser (valfritt)
              </label>
              <textarea
                id="allergies"
                value={data.allergies}
                onChange={(e) => updateData('allergies', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                placeholder="T.ex. glutenintolerant, vegetarian, allergisk mot nötter..."
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Steg {currentStep} av {TOTAL_STEPS}</span>
          <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Tillbaka
        </button>

        {currentStep === TOTAL_STEPS ? (
          <button
            onClick={handleComplete}
            disabled={!canProceed() || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Skapar din plan...
              </>
            ) : (
              <>
                Slutför
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Nästa
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
