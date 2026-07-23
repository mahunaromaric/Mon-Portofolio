import { C } from '../../constants'

export function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: light ? C.muted : C.blue,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <span style={{ width: 18, height: 1, background: light ? C.muted : C.blue, display: 'inline-block' }} />
      {children}
    </div>
  )
}
