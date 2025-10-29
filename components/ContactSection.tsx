'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Prasad4721',
    color: 'from-gray-600 to-gray-800'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/prasad-rahane',
    color: 'from-blue-600 to-blue-800'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:prasadrahane02@gmail.com',
    color: 'from-neon-blue to-neon-purple'
  }
]

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'prasadrahane02@gmail.com',
    description: 'Send me an email anytime'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 9890354721',
    description: 'Call me for urgent matters'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Sangamner, Maharashtra, India',
    description: 'Available for remote work'
  }
]

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data)
      
      setSubmitStatus('success')
      toast.success('Message sent successfully! I\'ll get back to you soon.')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden">
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
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mx-auto px-2">
            Ready to bring your ideas to life? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name.message}</span>
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email.message}</span>
                  </motion.p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.subject.message}</span>
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  {...register('message', { 
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message.message}</span>
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting || submitStatus === 'success'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover-glow'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Information */}
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 glass rounded-xl hover-glow cursor-pointer group"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center group-hover:animate-pulse">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{info.title}</h4>
                        <p className="text-neon-blue font-medium">{info.value}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Follow me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="flex items-center space-x-3 p-4 glass rounded-xl hover-glow group transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center group-hover:animate-pulse`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white group-hover:text-neon-blue transition-colors">
                        {social.name}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Quick Response */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="glass rounded-3xl p-8 text-center"
            >
              <MessageSquare className="w-12 h-12 text-neon-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
              <p className="text-gray-400 mb-4">
                I typically respond to messages within 24 hours. For urgent matters, feel free to call me directly.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Available for new projects</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

