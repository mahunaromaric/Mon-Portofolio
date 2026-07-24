import { useState } from 'react'
import { ArrowRight, CheckCircle2, Download, GitBranch, Globe, Mail, MapPin } from 'lucide-react'
import { C, useInView } from '../constants'
import { supabase } from '../supabase/client'
import { trackDownload } from '../supabase/track'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const { ref, inView } = useInView()

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 12,
    border: '1px solid transparent', outline: 'none',
    fontFamily: 'var(--font-sans)', fontSize: 14, color: C.ink,
    background: '#F1F5F9', transition: 'all 0.18s',
  }

  return (
    <section id="contact" style={{ padding: '7rem 0', background: C.cream }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} style={{
          textAlign: 'center', marginBottom: '3rem',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Label>Contact</Label>
          <Heading>Parlons de votre prochain projet.</Heading>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: 16, lineHeight: 1.7, color: C.muted, maxWidth: 480, margin: '1rem auto 0' }}>
            Une idée, un projet, une collaboration ? Écrivez-moi et je vous réponds sous 24h.
          </p>
        </div>

        <div ref={ref} style={{
          background: C.white, borderRadius: 24, padding: '3rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
        }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Mes coordonnées</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  {icon: <Mail size={16} />, label: 'Email', value: 'romamahuna@gmail.com', href: 'mailto:romamahuna@gmail.com'},
                  {icon: <MapPin size={16} />, label: 'Localisation', value: 'Cotonou, Bénin'},
                  {icon: <GitBranch size={16} />, label: 'GitHub', value: 'github.com/mahunaromaric', href: 'https://github.com/mahunaromaric'},
                  {icon: <Globe size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/romaric-gbenou-174a853b5', href: 'https://linkedin.com/in/romaric-gbenou-174a853b5'},
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: C.blue, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink, marginBottom: 1 }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, color: C.muted, textDecoration: 'none', transition: 'color 0.15s', padding: '15px 0', display: 'inline-block' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.blue}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.muted}>{item.value}</a>
                        : <span style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, color: C.muted }}>{item.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: '2rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <GitBranch size={16} />, label: 'GitHub', href: 'https://github.com/mahunaromaric' },
                  { icon: <Globe size={16} />, label: 'LinkedIn', href: 'https://linkedin.com/in/romaric-gbenou-174a853b5' },
                  { icon: <Download size={14} />, label: 'CV', href: '/cv.pdf' },
                ].map(s => (
                  <a key={s.label} href={s.href}
                    onClick={s.label === 'CV' ? () => { trackDownload('cv.pdf') } : undefined}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '14px 18px', borderRadius: 10,
                      background: '#F1F5F9', color: C.ink2,
                      fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
                      textDecoration: 'none', transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.color = '#fff' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#F1F5F9'; el.style.color = C.ink2 }}>
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle2 size={28} color={C.green} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: 8 }}>Message prêt !</h3>
                  <p style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: C.muted, marginBottom: '1.5rem' }}>Cliquez pour l'envoyer sur WhatsApp.</p>
                  <button onClick={() => {
                    const text = encodeURIComponent(
                      `*Nouveau message depuis le portfolio*\n\n*Nom :* ${form.name}\n*Email :* ${form.email}\n*Sujet :* ${form.subject}\n\n*Message :*\n${form.message}`
                    )
                    window.open(`https://wa.me/22961642237?text=${text}`, '_blank')
                    setSent(false)
                    setForm({ name: '', email: '', subject: '', message: '' })
                  }} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px', background: '#25D366', color: '#fff', border: 'none', borderRadius: 12,
                    cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                    transition: 'all 0.18s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '0.9' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.opacity = '1' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Envoyer sur WhatsApp
                  </button>
                </div>
              ) : (
                <form onSubmit={async e => {
                  e.preventDefault()
                  setSending(true)
                  if (!supabase) {
                    alert("Supabase n'est pas configuré. Configure VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.")
                    setSending(false)
                    return
                  }
                  const { error } = await supabase.from('messages').insert({
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: form.message,
                  })
                  if (error) {
                    console.error(error)
                    alert("Erreur lors de l'envoi. Réessaie ou écris-moi directement sur WhatsApp.")
                    setSending(false)
                    return
                  }
                  setSending(false)
                  setSent(true)
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                   <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label htmlFor="contact-name" style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Nom</label>
                      <input id="contact-name" type="text" required placeholder="Jean Dupont" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = C.blue}
                        onBlur={e => e.currentTarget.style.borderColor = 'transparent'} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Email</label>
                      <input id="contact-email" type="email" required placeholder="jean@exemple.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = C.blue}
                        onBlur={e => e.currentTarget.style.borderColor = 'transparent'} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Sujet</label>
                    <input id="contact-subject" type="text" required placeholder="Mission freelance — Application SaaS" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderColor = C.blue}
                      onBlur={e => e.currentTarget.style.borderColor = 'transparent'} />
                  </div>
                  <div>
                    <label htmlFor="contact-message" style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea id="contact-message" required rows={4} placeholder="Décrivez votre projet..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.currentTarget.style.borderColor = C.blue}
                      onBlur={e => e.currentTarget.style.borderColor = 'transparent'} />
                  </div>
                  <button type="submit" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px 28px', background: C.ink, color: '#fff', border: 'none', borderRadius: 12,
                    cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                    transition: 'all 0.18s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.blue; el.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.ink; el.style.transform = 'none' }}>
                    Envoyer {sending ? '...' : <ArrowRight size={15} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
