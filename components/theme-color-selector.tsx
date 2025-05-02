"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PaletteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

// Define our color themes
export const colorThemes = [
  {
    name: "default",
    primary: "15 80% 50%", // Orange-red
    secondary: "30 60% 95%",
    accent: "15 80% 95%",
    label: "Default",
  },
  {
    name: "blue",
    primary: "210 100% 50%", // Blue
    secondary: "210 60% 95%",
    accent: "210 80% 95%",
    label: "Ocean",
  },
  {
    name: "purple",
    primary: "270 76% 53%", // Purple
    secondary: "270 60% 95%",
    accent: "270 80% 95%",
    label: "Lavender",
  },
  {
    name: "green",
    primary: "142 76% 36%", // Green
    secondary: "142 60% 95%",
    accent: "142 80% 95%",
    label: "Forest",
  },
  {
    name: "pink",
    primary: "330 90% 65%", // Pink
    secondary: "330 60% 95%",
    accent: "330 80% 95%",
    label: "Rose",
  },
  {
    name: "teal",
    primary: "180 100% 30%", // Teal
    secondary: "180 60% 95%",
    accent: "180 80% 95%",
    label: "Aqua",
  },
  {
    name: "gold",
    primary: "45 100% 50%", // Gold
    secondary: "45 60% 95%",
    accent: "45 80% 95%",
    label: "Gold",
  },
]

export default function ThemeColorSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("default")

  const setColorTheme = (colorTheme: string) => {
    setSelectedColor(colorTheme)

    // Set CSS variables for the selected color theme
    const selectedTheme = colorThemes.find((t) => t.name === colorTheme)
    if (selectedTheme) {
      document.documentElement.style.setProperty("--primary", selectedTheme.primary)
      document.documentElement.style.setProperty("--secondary", selectedTheme.secondary)
      document.documentElement.style.setProperty("--accent", selectedTheme.accent)

      // Also update dark mode variants if in dark mode
      if (theme === "dark") {
        document.documentElement.style.setProperty("--accent-dark", selectedTheme.primary)
      }
    }
  }

  return (
    <div className="relative">
      <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change color theme"
          className="text-primary relative"
        >
          <PaletteIcon className="h-5 w-5" />
          <span className="sr-only">Color Themes</span>
        </Button>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 p-3 rounded-lg bg-glass border border-primary/20 shadow-lg z-50 w-64"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium mb-2">Select Theme Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {colorThemes.map((colorTheme) => (
                <motion.button
                  key={colorTheme.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setColorTheme(colorTheme.name)}
                  className={`w-10 h-10 rounded-full relative ${
                    selectedColor === colorTheme.name ? "ring-2 ring-offset-2 ring-primary" : ""
                  }`}
                  style={{
                    background: `hsl(${colorTheme.primary})`,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  aria-label={`${colorTheme.label} theme`}
                >
                  {selectedColor === colorTheme.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-border">
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={`${theme === "light" ? "bg-accent" : ""}`}
                >
                  Light
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={`${theme === "dark" ? "bg-accent" : ""}`}
                >
                  Dark
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("system")}
                  className={`${theme === "system" ? "bg-accent" : ""}`}
                >
                  System
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
