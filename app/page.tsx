import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { SkillsGalaxy } from '@/components/SkillsGalaxy'
import { ProjectsShowcase } from '@/components/ProjectsShowcase'
import { JourneyTimeline } from '@/components/JourneyTimeline'
import { ContactSection } from '@/components/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsGalaxy />
      <ProjectsShowcase />
      <JourneyTimeline />
      <ContactSection />
    </div>
  )
}


