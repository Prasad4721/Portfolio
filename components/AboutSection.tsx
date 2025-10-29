'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Coffee, Code, Gamepad2 } from 'lucide-react'
import Image from 'next/image'
import profileimg from "../public/MainProfilePhoto.png"

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const interests = [
    { icon: Code, label: 'Data Analysis', description: 'Turning data into insights' },
    { icon: Heart, label: 'AI/ML', description: 'Building intelligent systems' },
    { icon: Coffee, label: 'Learning', description: 'Always evolving my skills' },
    { icon: Gamepad2, label: 'Cloud Computing', description: 'AWS and scalable solutions' }
  ]

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden scroll-mt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-neural-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto px-2">
            The story of a passionate developer who believes technology should serve humanity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-full blur-3xl opacity-30 animate-pulse" />
              
              {/* Photo container */}
              <motion.div
                className="relative glass rounded-3xl p-8 hover-glow"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={profileimg}
                    alt="Prasad Rahane - AI & Data Science Enthusiast"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Code className="w-4 h-4 text-white" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [360, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Heart className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Main Story */}
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Hello, I'm Prasad Rahane! 👋
              </h3>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-base sm:text-lg">
                I'm an AI & Data Science enthusiast and intern at The Baap Company, gaining hands-on experience in Python, AWS, data analysis, and web development. Passionate about turning data into intelligent solutions, I focus on building scalable and efficient systems that solve real-world problems.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-white">
                What Drives Me
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {interests.map((interest, index) => {
                  const Icon = interest.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="glass rounded-xl p-4 hover-glow group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center group-hover:animate-pulse">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">{interest.label}</h5>
                          <p className="text-sm text-gray-400">{interest.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="glass rounded-xl p-6"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                My Journey & Achievements
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                  <span>BCA Graduate from University of Mysore</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
                  <span>HackerRank SQL (Advanced) & Python (Basic) Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                  <span>Currently interning at The Baap Company</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}




