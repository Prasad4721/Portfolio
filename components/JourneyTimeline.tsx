'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { GraduationCap, Briefcase, Award, Code, Rocket, Brain } from 'lucide-react'

const timelineEvents = [
  {
    id: 1,
    year: '2020',
    title: 'The Beginning',
    subtitle: 'Computer Science Student',
    description: 'Started my journey into the world of programming and technology. Learned the fundamentals of computer science, data structures, and algorithms.',
    icon: GraduationCap,
    color: 'from-blue-500 to-purple-500',
    achievements: ['First programming language: Python', 'Built my first website', 'Discovered passion for web development'],
    type: 'education'
  },
  {
    id: 2,
    year: '2021',
    title: 'First Steps',
    subtitle: 'Frontend Developer Intern',
    description: 'Landed my first internship as a frontend developer. Worked with React, JavaScript, and CSS to build responsive web applications.',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    achievements: ['Mastered React fundamentals', 'Learned modern CSS techniques', 'Built 5+ client projects'],
    type: 'work'
  },
  {
    id: 3,
    year: '2022',
    title: 'Expanding Horizons',
    subtitle: 'Full-Stack Developer',
    description: 'Transitioned to full-stack development, learning Node.js, databases, and cloud technologies. Started working on more complex projects.',
    icon: Rocket,
    color: 'from-pink-500 to-green-500',
    achievements: ['Added backend skills', 'Deployed first cloud application', 'Led team of 3 developers'],
    type: 'work'
  },
  {
    id: 4,
    year: '2023',
    title: 'AI Revolution',
    subtitle: 'AI/ML Specialist',
    description: 'Dove deep into artificial intelligence and machine learning. Built several AI-powered applications and contributed to open source projects.',
    icon: Brain,
    color: 'from-green-500 to-orange-500',
    achievements: ['Completed ML certification', 'Built 3 AI applications', 'Published research paper'],
    type: 'specialization'
  },
  {
    id: 5,
    year: '2024',
    title: 'Innovation Leader',
    subtitle: 'Senior Full-Stack Developer',
    description: 'Currently leading innovative projects, mentoring junior developers, and exploring cutting-edge technologies like AR/VR and blockchain.',
    icon: Award,
    color: 'from-orange-500 to-blue-500',
    achievements: ['Mentored 10+ developers', 'Launched startup', 'Speaking at conferences'],
    type: 'leadership'
  }
]

const eventTypes = [
  { type: 'all', label: 'All Journey', icon: Rocket },
  { type: 'education', label: 'Education', icon: GraduationCap },
  { type: 'work', label: 'Work', icon: Briefcase },
  { type: 'specialization', label: 'Specialization', icon: Brain },
  { type: 'leadership', label: 'Leadership', icon: Award }
]

// Responsive timeline card component
function TimelineCard({ event, index, isMobile }: { event: any, index: number, isMobile: boolean }) {
  const Icon = event.icon

  if (isMobile) {
    // Mobile: Vertical timeline layout
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative mb-8"
      >
        {/* Timeline line */}
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
        
        {/* Event card */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
          {/* Icon */}
          <div className="absolute -left-2 top-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center border-4 border-slate-900">
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {/* Content */}
          <div className="ml-6">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-2">
              <div className="text-lg sm:text-xl font-bold text-white">{event.year}</div>
              <div className="text-xs sm:text-sm text-blue-400 font-medium">{event.type}</div>
            </div>
            
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{event.title}</h3>
            <p className="text-sm text-blue-400 mb-2">{event.subtitle}</p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 line-clamp-3">{event.description}</p>
            
            {/* Achievements */}
            <div className="space-y-1">
              {event.achievements.slice(0, 2).map((achievement: string, achievementIndex: number) => (
                <div key={achievementIndex} className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  <span className="line-clamp-1">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Desktop: Orbital layout
  const total = timelineEvents.length
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 220
  const x = 300 + Math.cos(angle) * radius
  const y = 300 + Math.sin(angle) * radius
  const leftPct = (x / 600) * 100
  const topPct = (y / 600) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="absolute"
      style={{ left: `calc(${leftPct}% - 110px)`, top: `calc(${topPct}% - 70px)` }}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 w-[220px] hover:border-white/20 border border-white/10 cursor-pointer transition-all duration-300"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      >
        <div className="flex items-center mb-2">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${event.color} mr-3 flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{event.year}</div>
        </div>
        <h3 className="text-sm font-semibold text-white mb-1">{event.title}</h3>
        <p className="text-xs text-blue-400 mb-2">{event.subtitle}</p>
        <p className="text-xs text-gray-300 leading-relaxed mb-2 line-clamp-3">{event.description}</p>
        <div className="space-y-1">
          {event.achievements.slice(0, 2).map((achievement: string, achievementIndex: number) => (
            <div key={achievementIndex} className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="line-clamp-1">{achievement}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function JourneyTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedType, setSelectedType] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredEvents = selectedType === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.type === selectedType)

  return (
    <section id="journey" className="min-h-screen py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20" />
      
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - responsive */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 px-4"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            A timeline of growth, learning, and innovation in the world of technology
          </p>
        </motion.div>

        {/* Event Type Filter - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12 lg:mb-16 px-2"
        >
          {eventTypes.map((eventType) => {
            const Icon = eventType.icon
            return (
              <motion.button
                key={eventType.type}
                onClick={() => setSelectedType(eventType.type)}
                className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedType === eventType.type
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{eventType.label}</span>
                <span className="xs:hidden">{eventType.label.split(' ')[0]}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Timeline Content */}
        {isMobile ? (
          // Mobile: Vertical timeline
          <div className="relative">
            {filteredEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                isMobile={true}
              />
                        ))}
                      </div>
        ) : (
          // Desktop: Orbital timeline
          <div className="relative w-full">
            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
              {/* SVG orbit + connectors */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                {/* Concentric orbits */}
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#9b5cff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="300" cy="300" r="110" fill="url(#hubGlow)" opacity="0.6" />
                <circle cx="300" cy="300" r="140" stroke="#00f5ff33" strokeWidth="1.5" fill="none" />
                <circle cx="300" cy="300" r="200" stroke="#bf00ff2e" strokeWidth="1.5" fill="none" />
                <circle cx="300" cy="300" r="260" stroke="#ff00f529" strokeWidth="1.5" fill="none" />

                {filteredEvents.map((event, index) => {
                  const total = filteredEvents.length
                  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
                  const radius = 220
                  const x = 300 + Math.cos(angle) * radius
                  const y = 300 + Math.sin(angle) * radius

                  return (
                    <g key={`connector-${event.id}`}>
                      {/* curved connector */}
                      <path
                        d={`M300,300 Q ${300 + Math.cos(angle) * 120},${300 + Math.sin(angle) * 120} ${x},${y}`}
                        stroke="url(#grad)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.55"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#bf00ff" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#ff00f5" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>

                      {/* node */}
                      <circle cx={x} cy={y} r="6" fill="#ffffff" opacity="0.9" />
                    </g>
                  )
                })}

                {/* central hub */}
                <circle cx="300" cy="300" r="26" fill="#0ea5e9" opacity="0.9" />
                <circle cx="300" cy="300" r="42" stroke="#00f5ff" strokeOpacity="0.35" strokeWidth="2" fill="none" />
              </svg>

              {/* Event cards */}
              {filteredEvents.map((event, index) => (
                <TimelineCard
                  key={event.id}
                  event={event}
                  index={index}
                  isMobile={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Future Vision - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-4">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">The Future Awaits</h3>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
              As technology continues to evolve, I'm excited to be at the forefront of innovation. 
              My journey is far from over, and I'm constantly exploring new frontiers in AI, 
              quantum computing, and the next generation of web technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {['Quantum Computing', 'Advanced AI', 'Space Tech', 'Biotech'].map((future, index) => (
                <motion.span
                  key={future}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30"
                >
                  {future}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}