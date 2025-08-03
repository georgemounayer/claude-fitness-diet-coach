'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Dumbbell, 
  UtensilsCrossed, 
  TrendingUp, 
  User, 
  CreditCard,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Settings
} from 'lucide-react'

// Navigation items
const navItems = [
  { href: '/dashboard', icon: Home, label: 'Hem', description: 'Översikt och statistik' },
  { href: '/dashboard/workouts', icon: Dumbbell, label: 'Träning', description: 'Dina träningspass' },
  { href: '/dashboard/meals', icon: UtensilsCrossed, label: 'Mat', description: 'Måltidsplaner' },
  { href: '/dashboard/progress', icon: TrendingUp, label: 'Framsteg', description: 'Din utveckling' },
  { href: '/dashboard/profile', icon: User, label: 'Profil', description: 'Inställningar' },
  { href: '/dashboard/subscription', icon: CreditCard, label: 'Prenumeration', description: 'Din plan' }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Stäng menyer när route ändras
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileMenuOpen(false)
  }, [pathname])

  // Stäng menyer vid klick utanför
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">FitnessCoach</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Din personliga coach</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.href)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon 
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`} 
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User info (desktop) */}
          <div className="flex-shrink-0 px-4 pb-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    Anna Andersson
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Premium medlem
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Inställningar
                </button>
                <button className="flex-1 text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Logga ut
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">FitnessCoach</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsProfileMenuOpen(!isProfileMenuOpen)
                  }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Anna Andersson</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">anna@email.se</p>
                    </div>
                    <Link 
                      href="/dashboard/profile" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      Inställningar
                    </Link>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <LogOut className="w-4 h-4" />
                      Logga ut
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 w-80 bg-white dark:bg-gray-800 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col h-full pt-5 pb-4">
                {/* Mobile Logo */}
                <div className="flex items-center flex-shrink-0 px-6 pb-4">
                  <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">F</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">FitnessCoach</h1>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Din personliga coach</p>
                    </div>
                  </Link>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-4 space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = isActiveRoute(item.href)
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon 
                          className={`mr-3 h-5 w-5 flex-shrink-0 ${
                            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                          }`} 
                        />
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                        )}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = isActiveRoute(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
