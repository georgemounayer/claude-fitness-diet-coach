import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800`}>
      {/* Header med logga och tillbaka-knapp */}
      <header className="w-full p-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Tillbaka</span>
        </Link>
        
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-gray-800 dark:text-white hidden sm:block">
            FitnessCoach
          </span>
        </Link>
      </header>

      {/* Huvudinnehåll - centrerat */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Kortcontainer */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            {children}
          </div>
          
          {/* Footer info */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Genom att fortsätta godkänner du våra</p>
            <div className="flex justify-center gap-1 mt-1">
              <Link 
                href="/legal/terms" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
              >
                Användarvillkor
              </Link>
              <span>och</span>
              <Link 
                href="/legal/privacy" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
              >
                Integritetspolicy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
