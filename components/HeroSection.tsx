'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Sparkles, Zap, Brain } from 'lucide-react'

const typewriterTexts = [
  'AI & Data Science Enthusiast',
  'Software Developer',
  'Cloud Computing Expert',
  'Data Analyst'
]

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = typewriterTexts[currentText]
      
      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1))
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1))
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentText((prev) => (prev + 1) % typewriterTexts.length)
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentText])

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-neural-pattern opacity-20" />
      
      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-neon-blue"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8 opacity-60" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-20 text-neon-purple"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -15, 15, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Zap className="w-6 h-6 opacity-60" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-neon-pink"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 20, -20, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Brain className="w-7 h-7 opacity-60" />
      </motion.div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-base sm:text-lg md:text-xl text-gray-300 font-light">
            Welcome to my digital universe
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6"
        >
          <span className="gradient-text">Prasad Rahane</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-200 mb-3 sm:mb-4">
            I am a{' '}
            <span className="text-neon-blue font-medium">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-2">
          Turning Data into Intelligent Solutions | Innovator • Learner • Creator. Aspiring Software Developer & Cloud Enthusiast passionate about AI, data analysis, and building scalable systems.          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12"
        >
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold text-base sm:text-lg hover-glow focus-neon transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
          
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-3 sm:py-4 glass border border-neon-blue text-neon-blue rounded-full font-semibold text-base sm:text-lg hover:glass-neon focus-neon transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12"
        >
            {[
              { number: '1+', label: 'Year Experience' },
              { number: '5+', label: 'Certifications' },
              { number: '∞', label: 'Learning' }
            ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown className="w-8 h-8 text-neon-blue" />
      </motion.div>
    </section>
  )
}




