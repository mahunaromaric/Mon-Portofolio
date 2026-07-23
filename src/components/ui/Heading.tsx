import { C } from '../../constants'

export function Heading({ children, size = 'xl', light }: { children: React.ReactNode; size?: 'xl' | 'lg' | 'md'; light?: boolean }) {
  const sizes = { xl: 'clamp(2.2rem,4vw,3rem)', lg: 'clamp(1.8rem,3vw,2.4rem)', md: 'clamp(1.4rem,2.5vw,1.8rem)' }
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: sizes[size],
      fontWeight: 800,
      letterSpacing: '-0.04em',
      lineHeight: 1.1,
      color: light ? '#fff' : C.ink,
    }}>
      {children}
    </h2>
  )
}
