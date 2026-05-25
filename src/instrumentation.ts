export async function register() {
  // Only run in the Node.js runtime (server side), not in the Edge runtime
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const apiUrl = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/health'

    const ping = async () => {
      try {
        const res = await fetch(apiUrl)
        console.log(`[keep-alive] Pinged API ${apiUrl} → ${res.status}`)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        console.warn(`[keep-alive] Failed to ping API ${apiUrl}:`, message)
      }
    }

    // Ping every 5 minutes to prevent Render cold starts
    setInterval(ping, 5 * 60 * 1000)
  }
}
