import { useState, useEffect, useRef } from 'react'

export const C = {
  cream: '#F8F7F4',
  white: '#FFFFFF',
  ink: '#1F2937',
  ink2: '#374151',
  muted: '#64748B',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  blue: '#2563EB',
  blueDark: '#1D4ED8',
  blueLight: '#EFF6FF',
  teal: '#0F766E',
  green: '#16A34A',
  greenLight: '#F0FDF4',
  purple: '#7C3AED',
  orange: '#EA580C',
  pink: '#DB2777',
  slate: '#94A3B8',
}

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  tags: string[]
  focus: string[]
  accent: string
}

export interface SkillCategory {
  name: string
  icon: React.ReactNode
  color: string
  skills: string[]
}

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}
