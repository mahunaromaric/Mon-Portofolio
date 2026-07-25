import { useEffect } from 'react'
import './styles/responsive.css'
import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { supabase } from './supabase/client'

export default function App() {
  useEffect(() => {
    if (!supabase) return
    const today = new Date().toISOString().slice(0, 10)
    const path = window.location.pathname
    supabase.from('page_views').select('id, count').eq('path', path).eq('date', today).maybeSingle().then(({ data, error }) => {
      if (!supabase) return
      if (error) { console.error('page_views select error:', error); return }
      if (data) {
        supabase.from('page_views').update({ count: data.count + 1 }).eq('id', data.id)
      } else {
        supabase.from('page_views').insert({ path, date: today, count: 1 })
      }
    })
  }, [])

  return (
    <>
      <header><NavBar /></header>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
