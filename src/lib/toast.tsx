import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type ToastType = 'success' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastCtx {
  toast: (message: string, type?: ToastType) => void
}

const ctx = createContext<ToastCtx>({ toast: () => {} })
export const useToast = () => useContext(ctx)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <ctx.Provider value={{ toast: addToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            fontFamily: 'var(--font-sub)', color: '#fff',
            background: t.type === 'success' ? '#16A34A' : '#DC2626',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            animation: 'slideUp 0.25s ease',
          }}>
            {t.message}
          </div>
        ))}
      </div>
    </ctx.Provider>
  )
}
