import { ThemeProvider } from "@/components/theme-provider"
import Portfolio from "@/components/portfolio"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Portfolio />
    </ThemeProvider>
  )
}
