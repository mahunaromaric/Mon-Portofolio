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

export default function App() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..500&family=Manrope:wght@400..700&family=Plus+Jakarta+Sans:wght@400..800&family=Sora:wght@400..800&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <>
      <NavBar />
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
