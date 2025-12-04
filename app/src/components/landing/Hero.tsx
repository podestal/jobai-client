import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-6"
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Automatización Inteligente</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Consigue más{' '}
              <span className="bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                ofertas de trabajo
              </span>
              {' '}sin perder tiempo
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Aplica automáticamente a trabajos y personaliza cada carta de presentación y CV para cada oferta. Aumenta tus posibilidades de conseguir el trabajo ideal.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4 mb-10"
            >
              {[
                { icon: '✓', text: 'Aplicación automática a múltiples ofertas' },
                { icon: '✓', text: 'Carta de presentación personalizada para cada trabajo' },
                { icon: '✓', text: 'CV adaptado a cada descripción de puesto' },
                { icon: '✓', text: 'Aumenta tus posibilidades de éxito' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="shrink-0 w-8 h-8 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {feature.icon}
                  </div>
                  <span className="text-lg text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <span>Empezar gratis</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              {/* Job Application Card */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Desarrollador Full Stack</h3>
                    <p className="text-sm text-gray-500">Empresa Tech • Lima</p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">CV personalizado generado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Carta de presentación adaptada</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </motion.div>
                    <span className="text-sm text-gray-700">Aplicación enviada automáticamente</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">+85%</p>
                    <p className="text-xs text-gray-500">Tasa de éxito</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2 min</p>
                    <p className="text-xs text-gray-500">Por aplicación</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Job Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* Design Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -6, 0],
                  scale: 1,
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.6,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 cursor-pointer"
              >
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-linear-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Diseñador UX/UI</h4>
                    <p className="text-xs text-gray-500">Startup • Arequipa</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <span className="text-xs text-gray-600">CV adaptado</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      className="w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-pink-600 rounded-full"
                      />
                    </motion.div>
                    <span className="text-xs text-gray-600">Enviando...</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Marketing Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -6, 0],
                  scale: 1,
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.6,
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }
                }}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 cursor-pointer"
              >
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Marketing Digital</h4>
                    <p className="text-xs text-gray-500">Agencia • Cuzco</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <span className="text-xs text-gray-600">CV adaptado</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-purple-600 rounded-full"
                      />
                    </motion.div>
                    <span className="text-xs text-gray-600">Enviando...</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 blur-2xl"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero