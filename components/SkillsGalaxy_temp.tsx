"use client"

import React, { useState, useEffect } from 'react'

type Skill = { id: string; name: string; years: number; percent: number; description: string }

const SAMPLE_SKILLS: Skill[] = [
  { id: 's1', name: 'React', years: 5, percent: 92, description: 'Component-driven UI.' },
  { id: 's2', name: 'TypeScript', years: 4, percent: 86, description: 'Typed JavaScript.' },
  { id: 's3', name: 'Python', years: 6, percent: 90, description: 'Scripting and data.' },
]

export default function SkillsGalaxy(): JSX.Element {
  const [skills] = useState<Skill[]>(SAMPLE_SKILLS)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    // lightweight analytics hook
    try { (window as any).dataLayer?.push?.({ event: 'skills_mounted' }) } catch {}
  }, [])

  return (
    <section id="skills" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-white mb-2">Skills</h2>
        <p className="text-sm text-gray-300 mb-6">Interactive Skill Nebula is under active work. For now this accessible list provides the same data.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map(s => (
            <button key={s.id} onClick={() => setExpanded(s.id)} className="p-4 rounded bg-gray-900 border border-white/6 text-left">
              <div className="flex items-center justify-between">
                <div className="font-medium text-white">{s.name}</div>
                <div className="text-xs text-yellow-400">{s.percent}%</div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{s.years} years</div>
            </button>
          ))}
        </div>

        {expanded && (
          <div className="mt-6 p-4 rounded bg-white/5 border border-white/6">
            <button className="text-sm text-gray-300 mb-2" onClick={() => setExpanded(null)}>Close</button>
            <div className="text-white font-semibold">{skills.find(k => k.id === expanded)?.name}</div>
            <p className="text-sm text-gray-300 mt-2">{skills.find(k => k.id === expanded)?.description}</p>
          </div>
        )}
      </div>
    </section>
  )
}
