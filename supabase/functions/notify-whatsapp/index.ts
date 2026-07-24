import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'

serve(async (req) => {
  try {
    const { name, email, subject, message } = await req.json()

    const text = encodeURIComponent(
      `*Nouveau message du portfolio*\n\n*Nom :* ${name}\n*Email :* ${email}\n*Sujet :* ${subject}\n\n*Message :*\n${message}`
    )

    const phone = Deno.env.get('CALLMEBOT_PHONE') || '22961642237'
    const apiKey = Deno.env.get('CALLMEBOT_API_KEY')

    if (!apiKey) {
      throw new Error('CALLMEBOT_API_KEY not set')
    }

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${text}&apikey=${apiKey}`

    const res = await fetch(url)

    if (!res.ok) {
      console.error('callmebot error:', res.status, await res.text())
      return new Response('WhatsApp notification failed', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Internal error', { status: 500 })
  }
})
