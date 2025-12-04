import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Header = () => {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Reduce opacity as user scrolls (from 1 to 0.3)
      const newOpacity = Math.max(0.3, 1 - currentScrollY / 300)
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 1, y: -20 }}
      animate={{ opacity, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
    >
      <nav className="bg-black/90 backdrop-blur-md rounded-4xl shadow-2xl border border-gray-800/50 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Links */}
          <div className="flex items-center justify-evenly w-full gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="text-white/80 hover:text-white font-medium text-sm transition-colors">
                Inicio
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/features" className="text-white/80 hover:text-white font-medium text-sm transition-colors">
                Características
              </Link>
            </motion.div>
          </div>

          {/* Logo - Center */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center"
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              {/* <span className="text-white font-bold text-lg">JobAI</span> */}
            </Link>
          </motion.div>

          {/* Right Links */}
          <div className="flex items-center gap-6 justify-evenly w-full">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/pricing" className="text-white/80 hover:text-white font-medium text-sm transition-colors">
                Precios
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="text-white/80 hover:text-white font-medium text-sm transition-colors">
                Iniciar sesión
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header