'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ExternalLink, Github, Star, Eye, Code, Zap, Users, TrendingUp, X } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    id: 1,
    title: 'AI-Powered Task Manager',
    description: 'An intelligent task management system with AI-powered scheduling and productivity insights.',
    longDescription: 'Built with React, Node.js, and OpenAI API, this application uses machine learning to optimize task scheduling and provide productivity analytics. Features include smart notifications, team collaboration, and automated workflow optimization.',
    image: '/project-placeholder-1.svg',
    technologies: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'Socket.io'],
    category: 'Full Stack',
    status: 'Live',
    githubUrl: 'https://github.com/prasad/ai-task-manager',
    liveUrl: 'https://ai-task-manager.prasad.dev',
    stars: 234,
    downloads: 1500,
    impact: 'Improved productivity by 40% for 500+ users'
  },
  {
    id: 2,
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization tool for understanding neural network architectures.',
    longDescription: 'A cutting-edge web application that renders neural networks in 3D space, allowing users to explore different architectures, visualize data flow, and understand deep learning concepts through interactive exploration.',
    image: '/project-placeholder-2.svg',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'Python'],
    category: 'AI/ML',
    status: 'Live',
    githubUrl: 'https://github.com/prasad/neural-visualizer',
    liveUrl: 'https://neural-viz.prasad.dev',
    stars: 189,
    downloads: 890,
    impact: 'Used by 50+ universities for ML education'
  },
  {
    id: 3,
    title: 'Real-time Collaboration Platform',
    description: 'A modern workspace for teams with real-time editing, video calls, and project management.',
    longDescription: 'Built with WebRTC and WebSocket technology, this platform enables seamless real-time collaboration with features like live document editing, video conferencing, screen sharing, and integrated project management tools.',
    image: '/project-placeholder-3.svg',
    technologies: ['Next.js', 'WebRTC', 'PostgreSQL', 'Redis', 'AWS'],
    category: 'Full Stack',
    status: 'Live',
    githubUrl: 'https://github.com/prasad/collab-platform',
    liveUrl: 'https://collab.prasad.dev',
    stars: 156,
    downloads: 2300,
    impact: 'Serving 10,000+ active users daily'
  },
  {
    id: 4,
    title: 'Blockchain Analytics Dashboard',
    description: 'Advanced analytics platform for cryptocurrency and DeFi protocol analysis.',
    longDescription: 'A comprehensive dashboard that tracks blockchain transactions, analyzes DeFi protocols, and provides real-time market insights. Features include custom alert systems, portfolio tracking, and predictive analytics.',
    image: '/project-placeholder-4.svg',
    technologies: ['React', 'Python', 'Blockchain', 'GraphQL', 'Docker'],
    category: 'Blockchain',
    status: 'Beta',
    githubUrl: 'https://github.com/prasad/blockchain-analytics',
    liveUrl: 'https://crypto-analytics.prasad.dev',
    stars: 98,
    downloads: 450,
    impact: 'Analyzing $50M+ in daily transactions'
  },
  {
    id: 5,
    title: 'IoT Smart Home Controller',
    description: 'Unified platform for managing smart home devices with AI-powered automation.',
    longDescription: 'An intelligent home automation system that connects various IoT devices, learns user preferences, and automates daily routines. Features include voice control, energy optimization, and security monitoring.',
    image: '/project-placeholder-5.svg',
    technologies: ['React Native', 'Python', 'MQTT', 'TensorFlow', 'Raspberry Pi'],
    category: 'IoT',
    status: 'Development',
    githubUrl: 'https://github.com/prasad/smart-home-iot',
    liveUrl: null,
    stars: 67,
    downloads: 120,
    impact: 'Reduced energy consumption by 25%'
  },
  {
    id: 6,
    title: 'AR Shopping Experience',
    description: 'Augmented reality application for virtual try-on and interactive shopping.',
    longDescription: 'An innovative AR application that allows users to virtually try on products, visualize furniture in their homes, and make informed purchasing decisions through immersive 3D experiences.',
    image: '/project-placeholder-6.svg',
    technologies: ['React', 'WebXR', 'Three.js', 'Node.js', 'ARCore'],
    category: 'AR/VR',
    status: 'Live',
    githubUrl: 'https://github.com/prasad/ar-shopping',
    liveUrl: 'https://ar-shop.prasad.dev',
    stars: 134,
    downloads: 2100,
    impact: 'Increased conversion rates by 60%'
  }
]

const categories = ['All', 'Full Stack', 'AI/ML', 'Blockchain', 'IoT', 'AR/VR']

export function ProjectsShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Project Showcase</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio of innovative projects that push the boundaries of technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'glass-neon text-neon-blue'
                  : 'glass text-gray-300 hover:text-white hover:glass-neon'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover-glow cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.downloads}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <Github className="w-4 h-4 hover:text-neon-blue transition-colors" />
                    )}
                    {project.liveUrl && (
                      <ExternalLink className="w-4 h-4 hover:text-neon-blue transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div
                className="relative glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-3xl font-bold text-white">
                        {selectedProject.title}
                      </h3>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-white hover:text-neon-blue transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        selectedProject.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {selectedProject.status}
                      </span>
                      <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm font-medium">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue rounded-full text-sm font-medium border border-neon-blue/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Stats */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="glass rounded-xl p-4 text-center">
                      <Star className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{selectedProject.stars}</div>
                      <div className="text-gray-400 text-sm">GitHub Stars</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-neon-purple mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{selectedProject.downloads}</div>
                      <div className="text-gray-400 text-sm">Downloads</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <Users className="w-8 h-8 text-neon-pink mx-auto mb-2" />
                      <div className="text-sm text-gray-300">{selectedProject.impact}</div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 glass-neon rounded-full text-neon-blue font-semibold hover-glow transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {selectedProject.liveUrl && (
                      <motion.a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold hover-glow transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
