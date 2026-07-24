import { useState } from 'react'
import { ArrowRight, Download, GitBranch, Globe, Mail, MapPin } from 'lucide-react'
import { C, useInView } from '../constants'
import { supabase } from '../supabase/client'
import { trackDownload } from '../supabase/track'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
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
              <form onSubmit={async e => {
                  e.preventDefault()
                  setSending(true)
                  if (!supabase) {
                    window.open(`https://wa.me/22961642237?text=${encodeURIComponent(
                      `*Nouveau message du portfolio*\n\n*Nom :* ${form.name}\n*Email :* ${form.email}\n*Sujet :* ${form.subject}\n\n*Message :*\n${form.message}`
                    )}`, '_blank')
                    setSending(false)
                    setForm({ name: '', email: '', subject: '', message: '' })
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
                  const text = encodeURIComponent(
                    `*Nouveau message du portfolio*\n\n*Nom :* ${form.name}\n*Email :* ${form.email}\n*Sujet :* ${form.subject}\n\n*Message :*\n${form.message}`
                  )
                  window.open(`https://wa.me/22961642237?text=${text}`, '_blank')
                  setForm({ name: '', email: '', subject: '', message: '' })
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
