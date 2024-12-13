"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">FundRaiser</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {isAuthenticated && (
              <>
                <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
                <li><Link href="/campaign" className="hover:underline">Campaign</Link></li>
              </>
            )}
            {!isAuthenticated && (
              <li><Link href="/login" className="hover:underline">Login</Link></li>
            )}
          </ul>
        </nav>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {isAuthenticated && (
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
      </div>
      {isOpen && (
        <motion.nav 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {isAuthenticated && (
              <>
                <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
                <li><Link href="/campaign" className="hover:underline">Campaign</Link></li>
              </>
            )}
            {!isAuthenticated && (
              <li><Link href="/login" className="hover:underline">Login</Link></li>
            )}
          </ul>
        </motion.nav>
      )}
    </header>
  )
}

