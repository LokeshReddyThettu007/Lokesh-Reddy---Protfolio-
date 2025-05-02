"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type BackgroundTheme = {
  name: string
  component: React.ReactNode
}

// Particle Background
const ParticleBackground = ({ theme }: { theme: string | undefined }) => (
  <div className="absolute inset-0">
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className={`absolute rounded-full ${theme === "dark" ? "bg-primary/20" : "bg-primary/10"} blur-sm`}
        style={{
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, Math.random() * 100 - 50, 0],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

// Wave Background
const WaveBackground = ({ theme }: { theme: string | undefined }) => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={`wave-${i}`}
        className={`absolute h-[30vh] w-[200vw] ${theme === "dark" ? "bg-primary/5" : "bg-primary/3"} rounded-[100%]`}
        style={{
          bottom: `${-10 - i * 15}%`,
          left: "-50%",
        }}
        animate={{
          translateX: ["-10%", "10%", "-10%"],
        }}
        transition={{
          duration: 20 + i * 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

// Gradient Mesh Background
const GradientMeshBackground = ({ theme }: { theme: string | undefined }) => (
  <div className="absolute inset-0">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={`gradient-${i}`}
        className="absolute rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsla(var(--primary), 0.3) 0%, transparent 70%)`,
          width: `${Math.random() * 50 + 20}vw`,
          height: `${Math.random() * 50 + 20}vh`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, Math.random() * 50 - 25, 0],
          y: [0, Math.random() * 50 - 25, 0],
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

// Geometric Background
const GeometricBackground = ({ theme }: { theme: string | undefined }) => (
  <div className="absolute inset-0">
    {Array.from({ length: 15 }).map((_, i) => {
      const shapes = ["rounded-full", "rounded-md", "rounded-none rotate-45"]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]

      return (
        <motion.div
          key={`geo-${i}`}
          className={`absolute ${shape} ${theme === "dark" ? "bg-primary/10" : "bg-primary/5"}`}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 30 + 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      )
    })}
  </div>
)

// Nebula Background
const NebulaBackground = ({ theme }: { theme: string | undefined }) => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={`nebula-${i}`}
        className="absolute rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsla(var(--primary), 0.4) 0%, hsla(var(--primary), 0.1) 50%, transparent 70%)`,
          width: `${Math.random() * 60 + 40}vw`,
          height: `${Math.random() * 60 + 40}vh`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, Math.random() * 20 - 10, 0],
          y: [0, Math.random() * 20 - 10, 0],
        }}
        transition={{
          duration: Math.random() * 40 + 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)

  const backgroundThemes: BackgroundTheme[] = [
    {
      name: "Default",
      component: (
        <>
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-br from-black/80 to-black/40"
                : "bg-gradient-to-br from-white/80 to-white/40"
            }`}
          />

          {/* Animated shapes */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${theme === "dark" ? "bg-primary/10" : "bg-primary/5"} blur-3xl`}
                style={{
                  width: `${Math.random() * 30 + 10}vw`,
                  height: `${Math.random() * 30 + 10}vh`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                  ],
                  y: [
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                    Math.random() * 20 - 10,
                  ],
                  scale: [1, 1.1, 0.9, 1],
                  opacity: [0.3, 0.4, 0.2, 0.3],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Grid pattern */}
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "opacity-10" : "opacity-5"
            } bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]`}
          />

          {/* Animated lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className={`absolute h-px w-full ${theme === "dark" ? "bg-primary/20" : "bg-primary/10"}`}
                style={{
                  top: `${25 * (i + 1)}%`,
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  left: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 5,
                }}
              />
            ))}

            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`vline-${i}`}
                className={`absolute w-px h-full ${theme === "dark" ? "bg-primary/20" : "bg-primary/10"}`}
                style={{
                  left: `${25 * (i + 1)}%`,
                }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  top: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 5,
                }}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      name: "Particles",
      component: <ParticleBackground theme={theme} />,
    },
    {
      name: "Waves",
      component: <WaveBackground theme={theme} />,
    },
    {
      name: "Gradient Mesh",
      component: <GradientMeshBackground theme={theme} />,
    },
    {
      name: "Geometric",
      component: <GeometricBackground theme={theme} />,
    },
    {
      name: "Nebula",
      component: <NebulaBackground theme={theme} />,
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgroundThemes[currentTheme].component}

      {/* Background theme selector */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-glass rounded-full px-3 py-1 flex gap-2 border border-primary/10">
          {backgroundThemes.map((bgTheme, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentTheme(index)}
              className={`w-3 h-3 rounded-full ${currentTheme === index ? "bg-primary" : "bg-primary/30"}`}
              aria-label={`Switch to ${bgTheme.name} background`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
