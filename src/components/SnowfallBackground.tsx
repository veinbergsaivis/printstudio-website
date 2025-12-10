import React, { useEffect, useRef } from 'react'

/**
 * SnowfallBackground — Elegantas sniega animācijas komponts
 * Renderē sniega daļiņas Canvas-bāzēti, pielāgojas vecāka elementa izmēram
 */
const SnowfallBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas uz konteinera izmēru
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Sniega daļiņu masīvs
    interface Snowflake {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      drift: number
    }

    const snowflakes: Snowflake[] = []
    const flakeCount = Math.max(30, Math.floor(canvas.width / 15)) // Min 30, adaptīvs pēc platuma

    // Inicializē sniega daļiņas
    for (let i = 0; i < flakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 0.8, // 0.8–3.3 px (spilgtāks)
        speed: Math.random() * 0.8 + 0.3, // 0.3–1.1 px/frame
        opacity: Math.random() * 0.6 + 0.4, // 0.4–1.0
        drift: Math.random() * 2 - 1, // −1 līdz +1 horizontāli
      })
    }

    let animationId: number
    const animate = () => {
      // Pūc fona ar puslaidītu baltu
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Zīmē un atjaunina sniega daļiņas
      snowflakes.forEach(flake => {
        flake.y += flake.speed
        flake.x += flake.drift * 0.3

        // Ciklē daļiņas — ja nokrīt apakšā, parādās augšā
        if (flake.y > canvas.height + 10) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }

        // Ciklē pa sāniem
        if (flake.x < -10) flake.x = canvas.width + 10
        if (flake.x > canvas.width + 10) flake.x = -10

        // Zīmē sniega daļiņu kā baltas sfēres
        ctx.globalAlpha = flake.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div ref={containerRef} className='absolute inset-0 pointer-events-none'>
      <canvas ref={canvasRef} className='block w-full h-full' style={{ mixBlendMode: 'screen' }} />
    </div>
  )
}

export default SnowfallBackground
