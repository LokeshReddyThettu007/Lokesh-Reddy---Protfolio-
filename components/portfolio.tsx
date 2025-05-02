"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  MoonIcon,
  SunIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  CodeIcon,
  LayoutGridIcon,
  SparklesIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import AnimatedBackground from "./animated-background"
import { techIcons } from "./tech-icons"
import ThemeColorSelector from "./theme-color-selector"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mouse cursor refs
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorOutlineRef = useRef<HTMLDivElement>(null)

  // Mouse position values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 300 }
  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)

  // Slower follow for the outline
  const outlineX = useSpring(mouseX, { ...springConfig, stiffness: 100 })
  const outlineY = useSpring(mouseY, { ...springConfig, stiffness: 100 })

  // Cursor scale for hover effects
  const cursorScale = useMotionValue(1)
  const cursorScaleSpring = useSpring(cursorScale, springConfig)
  const outlineScale = useTransform(cursorScaleSpring, [1, 1.5], [1, 1.5])

  // Refs for each section
  const aboutRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const certificatesRef = useRef<HTMLElement>(null)
  const achievementsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Custom cursor effect
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseEnter = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1"
      if (cursorOutlineRef.current) cursorOutlineRef.current.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0"
      if (cursorOutlineRef.current) cursorOutlineRef.current.style.opacity = "0"
    }

    // Add hover effect to interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea')

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursorScale.set(1.5))
        el.addEventListener("mouseleave", () => cursorScale.set(1))
      })
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Call once DOM is ready
    if (mounted) {
      addHoverEffect()
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY, cursorScale, mounted])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = [
      aboutRef.current,
      skillsRef.current,
      projectsRef.current,
      certificatesRef.current,
      achievementsRef.current,
      experienceRef.current,
      educationRef.current,
      contactRef.current,
    ]

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [mounted])

  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const skills = {
    languages: ["Python", "C++", "C", "Java"],
    frameworks: ["HTML", "CSS", "Flutter", "Dart"],
    tools: ["SQL", "Tableau", "Firebase", "Google Cloud"],
    soft: ["Problem-Solving", "Team Player", "Project Management", "Adaptability"],
  }

  const projects = [
    {
      title: "Depron Dining Application",
      description:
        "Developed a dining app using Flutter for a seamless user experience. Managed backend infrastructure and cloud services with Google Cloud for scalability and performance.",
      tags: ["Flutter", "Google Cloud", "Firebase", "Dart"],
      date: "Feb 2024",
      link: "#",
    },
    {
      title: "Depron Partner | Restaurant Management App",
      description:
        "Designed and developed a restaurant partner app to streamline order and table management. Integrated Google Cloud for real-time data synchronization and analytics.",
      tags: ["Flutter", "Google Cloud", "Firebase", "Dart"],
      date: "May 2024",
      link: "#",
    },
    {
      title: "GetJob.in | Real-Time Project",
      description:
        "Built a job search platform enabling resume uploads and job applications. Designed an ML-powered recommendation engine improving job matching efficiency.",
      tags: ["Python", "SQL", "JavaScript", "HTML", "CSS"],
      date: "2023-2024",
      link: "#",
    },
    {
      title: "Crop Recommendation System",
      description:
        "Processed agricultural datasets using Scikit-learn, optimizing performance by 30%. Leveraged ML algorithms (Random Forest, KNN) achieving an 85% accuracy rate.",
      tags: ["Python", "ML", "Pandas", "Flask"],
      date: "November 2022",
      link: "#",
    },
  ]

  const certifications = [
    { name: "Packet Switching", issuer: "Coursera", date: "November 2024" },
    { name: "TCP/IP Protocols", issuer: "Coursera", date: "November 2024" },
    { name: "Peer to Peer Connection", issuer: "Coursera", date: "October 2024" },
    { name: "Fundamentals Of Networks", issuer: "Coursera", date: "September 2024" },
    { name: "Bits and Bytes", issuer: "Coursera", date: "August 2024" },
    { name: "Data Structures and Algorithms Self Placed", issuer: "GeeksforGeeks", date: "July 2024" },
  ]

  const achievements = [
    {
      title: "Hackathon",
      description:
        "Cleared third round in Hackathon that was contacted by Code Storm's last year. We built a website that is inspired by ISRO official website and cleared 3 rounds.",
      date: "October 2024",
    },
    {
      title: "Start-up",
      description: "Awarded as one of the Best startups in the campus and got funded with 1 lakhs by our campus.",
      date: "May 2024",
    },
    {
      title: "Topper of the Batch",
      description: "I was Topper of my +2 batch with 83% percentage.",
      date: "June 2022",
    },
  ]

  const experience = [
    {
      company: "Elewayte",
      role: "Data Scientist Intern",
      period: "June 5 - August 20, 2024",
      responsibilities: [
        "Built a real-time recommendation system using Machine Learning (Scikit-learn, TensorFlow) to improve user engagement.",
        "Analyzed customer behavior patterns and optimized marketing strategies using Python & SQL.",
        "Developed an AI-powered chatbot for automating customer support, reducing response time by 40%.",
        "Implemented Google Cloud AI services for scalable model deployment and efficient data processing.",
      ],
    },
    {
      company: "Skill Vertex",
      role: "Intern",
      period: "June 15 - September 17, 2023",
      responsibilities: [
        "Developed interactive dashboards using Tableau for visualizing key business metrics.",
        "Optimized SQL queries to improve data retrieval speed by 30%, enhancing reporting efficiency.",
        "Conducted data cleaning and preprocessing for a real-time sales analysis project, ensuring accuracy.",
        "Worked with Python (Pandas, NumPy) for predictive analytics to forecast sales trends.",
      ],
    },
  ]

  const education = [
    {
      degree: "Bachelor of Technology - Computer Science and Engineering",
      institution: "Lovely Professional University",
      location: "Punjab, India",
      grade: "CGPA: 6.33",
      period: "Since August 2022",
    },
    {
      degree: "Intermediate",
      institution: "Sri Chaitanya Techno School",
      location: "Bengaluru, K.A.",
      grade: "Percentage: 83%",
      period: "April 2021 - June 2022",
    },
    {
      degree: "10th class",
      institution: "Vijaya Bharathi School",
      location: "Madanapalli, A.P.",
      grade: "Percentage: 82%",
      period: "April 2019 - March 2020",
    },
  ]

  // Animation variants
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const textReveal = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const scaleUp = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const slideIn = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Custom cursor */}
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot hidden md:block"
        style={{
          left: dotX,
          top: dotY,
        }}
      />
      <motion.div
        ref={cursorOutlineRef}
        className="cursor-outline hidden md:block"
        style={{
          left: outlineX,
          top: outlineY,
          scale: outlineScale,
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/20 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h2
            className="text-xl font-bold text-gradient-gold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            lokesh reddy
          </motion.h2>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "certificates", label: "Certificates" },
              { id: "achievements", label: "Achievements" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" },
            ].map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`capitalize transition-colors duration-300 ${
                  activeSection === section.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {section.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2">
            <ThemeColorSelector />
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="text-primary"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <LayoutGridIcon className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-glass border-b border-primary/20"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                {[
                  { id: "about", label: "About", icon: <CodeIcon className="h-4 w-4" /> },
                  { id: "skills", label: "Skills", icon: <CodeIcon className="h-4 w-4" /> },
                  { id: "projects", label: "Projects", icon: <CodeIcon className="h-4 w-4" /> },
                  { id: "certificates", label: "Certificates", icon: <AwardIcon className="h-4 w-4" /> },
                  { id: "achievements", label: "Achievements", icon: <AwardIcon className="h-4 w-4" /> },
                  { id: "experience", label: "Experience", icon: <BriefcaseIcon className="h-4 w-4" /> },
                  { id: "education", label: "Education", icon: <GraduationCapIcon className="h-4 w-4" /> },
                  { id: "contact", label: "Contact", icon: <MailIcon className="h-4 w-4" /> },
                ].map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-300 ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          id="about"
          ref={aboutRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div variants={scaleUp} className="w-full md:w-1/3 flex justify-center">
            <motion.div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary premium-border">
              <Image
                src="/profile-image.png"
                alt="Lokesh Reddy"
                width={200}
                height={200}
                className="object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                animate={{
                  background: [
                    "linear-gradient(to top right, hsla(var(--primary) / 0.2), transparent)",
                    "linear-gradient(to bottom right, hsla(var(--primary) / 0.2), transparent)",
                    "linear-gradient(to top right, hsla(var(--primary) / 0.2), transparent)",
                  ],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <motion.h1 variants={textReveal} className="text-4xl md:text-5xl font-bold mb-2 text-gradient-gold">
              Lokesh Reddy Thettu
            </motion.h1>
            <motion.p variants={textReveal} className="text-xl text-muted-foreground mb-6">
              Data Scientist | Flutter Developer | Problem Solver
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="text-primary border-primary hover:bg-primary/10 bg-glass"
                >
                  <a
                    href="https://www.linkedin.com/in/Lokesh-Reddy-Thettu"
                    target="_blank"
                    aria-label="LinkedIn"
                    rel="noreferrer"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="text-primary border-primary hover:bg-primary/10 bg-glass"
                >
                  <a href="https://github.com/beastoninvictous" target="_blank" aria-label="GitHub" rel="noreferrer">
                    <GithubIcon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="text-primary border-primary hover:bg-primary/10 bg-glass"
                >
                  <a href="mailto:lokeshreddythettu@gmail.com" aria-label="Email">
                    <MailIcon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="text-primary border-primary hover:bg-primary/10 bg-glass"
                >
                  <a href="tel:+917670911715" aria-label="Phone">
                    <PhoneIcon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group"
              >
                <Button variant="default" className="bg-primary hover:bg-primary/90 relative z-10">
                  Download Resume
                </Button>
                <motion.div
                  className="absolute inset-0 bg-primary/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          ref={skillsRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <SparklesIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Skills
            </motion.h2>
          </motion.div>
          <motion.div variants={scaleUp}>
            <Tabs defaultValue="languages" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-glass">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              </TabsList>
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skillList.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{
                          scale: 1.1,
                          rotate: Math.random() * 4 - 2,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Badge
                          variant="secondary"
                          className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default skill-badge bg-glass flex items-center gap-2"
                        >
                          <span className="tech-icon-wrapper">{techIcons[skill as keyof typeof techIcons]}</span>
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          ref={projectsRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <CodeIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Projects
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="h-full card-hover"
              >
                <Card className="overflow-hidden h-full border-2 hover:border-primary transition-all duration-300 hover:shadow-lg premium-card">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-primary">{project.title}</CardTitle>
                      <Badge variant="outline" className="text-xs bg-glass">
                        {project.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + tagIndex * 0.1 }}
                        >
                          <Badge variant="outline" className="text-xs bg-primary/10 hover:bg-primary/20">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="ghost" size="sm" className="ml-auto text-primary group" asChild>
                        <a href={project.link} target="_blank" rel="noreferrer">
                          View Project{" "}
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                          >
                            <ExternalLinkIcon className="ml-2 h-4 w-4" />
                          </motion.span>
                        </a>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certificates Section */}
        <motion.section
          id="certificates"
          ref={certificatesRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <AwardIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Certificates
            </motion.h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="rounded-lg p-4 hover:border-primary transition-all duration-300 premium-card"
              >
                <div className="flex flex-col h-full">
                  <motion.h4
                    className="font-medium text-lg text-primary"
                    animate={{
                      color: ["hsl(var(--primary))", "hsl(30 80% 50%)", "hsl(var(--primary))"],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {cert.name}
                  </motion.h4>
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Badge variant="outline" className="bg-primary/5 bg-glass">
                      Certificate
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section
          id="achievements"
          ref={achievementsRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <SparklesIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Achievements
            </motion.h2>
          </motion.div>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={slideIn}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 premium-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-primary">{achievement.title}</CardTitle>
                      <Badge variant="outline" className="bg-glass">
                        {achievement.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      {achievement.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          ref={experienceRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <BriefcaseIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Work Experience
            </motion.h2>
          </motion.div>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary"
              >
                <motion.div
                  className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="pb-2 px-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="text-xl text-gradient-gold">{job.company}</CardTitle>
                        <CardDescription className="text-base font-medium">{job.role}</CardDescription>
                      </div>
                      <Badge variant="outline" className="md:self-start whitespace-nowrap bg-glass">
                        {job.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-0">
                    <ul className="space-y-2 mt-2">
                      {job.responsibilities.map((responsibility, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <ChevronRightIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{responsibility}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          ref={educationRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <GraduationCapIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Education
            </motion.h2>
          </motion.div>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0.5 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary premium-card">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-primary">{edu.degree}</CardTitle>
                        <CardDescription className="text-base">
                          {edu.institution}, {edu.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="md:self-start whitespace-nowrap bg-glass">
                        {edu.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm">
                      <motion.span className="font-medium text-primary" whileHover={{ scale: 1.1 }}>
                        {edu.grade}
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          ref={contactRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <MailIcon className="h-8 w-8 text-primary inline-block mb-2 animate-pulse-slow" />
            </motion.div>
            <motion.h2 variants={textReveal} className="text-3xl font-bold text-gradient-gold">
              Get In Touch
            </motion.h2>
          </motion.div>
          <motion.div variants={scaleUp} whileHover={{ scale: 1.02 }} className="relative">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl blur-lg opacity-75"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <Card className="max-w-2xl mx-auto border-2 hover:border-primary transition-all duration-300 relative z-10 premium-card">
              <CardHeader>
                <CardTitle className="text-gradient-gold">Contact Information</CardTitle>
                <CardDescription>Feel free to reach out for opportunities or collaborations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div className="flex items-center gap-3 group" whileHover={{ x: 5 }}>
                  <MailIcon className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:lokeshreddythettu@gmail.com"
                    className="hover:text-primary transition-colors group-hover:underline"
                  >
                    lokeshreddythettu@gmail.com
                  </a>
                </motion.div>
                <motion.div className="flex items-center gap-3 group" whileHover={{ x: 5 }}>
                  <PhoneIcon className="h-5 w-5 text-primary" />
                  <a href="tel:+917670911715" className="hover:text-primary transition-colors group-hover:underline">
                    +91-7670911715
                  </a>
                </motion.div>
                <motion.div className="flex items-center gap-3 group" whileHover={{ x: 5 }}>
                  <LinkedinIcon className="h-5 w-5 text-primary" />
                  <a
                    href="https://www.linkedin.com/in/Lokesh-Reddy-Thettu"
                    target="_blank"
                    className="hover:text-primary transition-colors group-hover:underline"
                    rel="noreferrer"
                  >
                    linkedin.com/in/Lokesh-Reddy-Thettu
                  </a>
                </motion.div>
                <motion.div className="flex items-center gap-3 group" whileHover={{ x: 5 }}>
                  <GithubIcon className="h-5 w-5 text-primary" />
                  <a
                    href="https://github.com/beastoninvictous"
                    target="_blank"
                    className="hover:text-primary transition-colors group-hover:underline"
                    rel="noreferrer"
                  >
                    github.com/beastoninvictous
                  </a>
                </motion.div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 relative overflow-hidden group">
                    <span className="relative z-10">Send Message</span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.section>
      </main>

      <motion.footer
        className="border-t border-border py-8 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.p
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            ©️ {new Date().getFullYear()} Lokesh Reddy Thettu. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}
