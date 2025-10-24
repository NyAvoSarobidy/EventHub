'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/technology', label: 'Technology' },
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/10' : 'bg-white/95 backdrop-blur-md border-b border-black/10'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div className="nav-logo">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-800 to-blue-700 bg-clip-text text-transparent">AuraTwin</h1>
                    <p className="text-xs text-black/60">Intelligence Artificielle</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-150 hover:text-blue-800 ${pathname === item.href
                  ? 'text-blue-800 after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-800 after:to-blue-700 after:rounded-sm'
                  : 'text-slate-600'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-6 py-3 rounded-md font-semibold text-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md shadow-sm">
              Request Demo
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-slate-800 transition-all duration-150 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
              <span className={`w-6 h-0.5 bg-slate-800 transition-all duration-150 ${isMenuOpen ? 'opacity-0' : ''
                }`}></span>
              <span className={`w-6 h-0.5 bg-slate-800 transition-all duration-150 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors duration-150 ${pathname === item.href
                  ? 'text-blue-800'
                  : 'text-slate-600 hover:text-blue-800'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full bg-gradient-to-r from-blue-800 to-blue-700 text-white px-6 py-3 rounded-md font-semibold text-sm transition-all duration-150 hover:shadow-md shadow-sm mt-4">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar