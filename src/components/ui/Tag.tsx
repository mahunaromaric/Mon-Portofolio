import { C } from '../../constants'

export function Tag({ children, mono = false, color }: { children: React.ReactNode; mono?: boolean; color?: string }) {
  return (
    <span style={{
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 500,
      padding: '3px 9px',
      background: color ? `${color}14` : C.borderLight,
      color: color || C.muted,
      borderRadius: 5,
      letterSpacing: mono ? '0.01em' : undefined,
      display: 'inline-block',
    }}>
      {children}
    </span>
  )
}
