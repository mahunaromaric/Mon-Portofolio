import { C, useInView } from '../constants'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'
import { useSkills } from '../data'
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiTailwindcss,
  SiLaravel, SiPhp, SiNodedotjs, SiExpress,
  SiPostgresql, SiMysql, SiPrisma,
  SiGit, SiGithub, SiLinux, SiFigma,
} from 'react-icons/si'

const skillIcons: Record<string, React.ReactNode> = {
  'React': <SiReact size={13} />,
  'Next.js': <SiNextdotjs size={13} />,
  'JavaScript': <SiJavascript size={13} />,
  'TypeScript': <SiTypescript size={13} />,
  'HTML5 & CSS3': <SiHtml5 size={13} />,
  'Tailwind CSS': <SiTailwindcss size={13} />,
  'Laravel': <SiLaravel size={13} />,
  'PHP': <SiPhp size={13} />,
  'Node.js': <SiNodedotjs size={13} />,
  'Express': <SiExpress size={13} />,
  'PostgreSQL': <SiPostgresql size={13} />,
  'MySQL': <SiMysql size={13} />,
  'Prisma ORM': <SiPrisma size={13} />,
  'Git': <SiGit size={13} />,
  'GitHub': <SiGithub size={13} />,
  'Linux': <SiLinux size={13} />,
  'Figma': <SiFigma size={13} />,
}

export function Skills() {
  const { skills: skillCategories } = useSkills()
  const { ref, inView } = useInView()

  return (
    <section id="skills" style={{ padding: '7rem 0', background: C.white }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <Label>Compétences</Label>
        <div ref={ref} style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Heading>Une stack éprouvée, choisie avec soin.</Heading>
        </div>

        <div ref={ref} style={{
          marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
        }}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.name} className="skills-row" style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap',
              padding: '1.25rem 1.5rem', borderRadius: 12,
              background: C.cream,
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)',
              transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${ci * 0.1}s`,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13.5, color: cat.color, letterSpacing: '-0.02em',
                minWidth: 110,
              }}>
                {cat.icon}
                {cat.name}
              </div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
              }}>
                {cat.skills.map(s => (
                  <span key={s} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 500, color: C.ink2,
                    padding: '5px 10px', background: C.white, borderRadius: 8,
                    border: `1px solid ${C.borderLight}`,
                  }}>
                    {skillIcons[s]}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
