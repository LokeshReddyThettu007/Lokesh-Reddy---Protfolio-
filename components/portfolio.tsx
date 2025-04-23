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
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("about")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Lokesh Reddy</h2>

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
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`capitalize transition-colors duration-300 ${
                  activeSection === section.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-primary"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <LayoutGridIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-background border-b border-border"
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
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors duration-300 ${
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          id="about"
          ref={aboutRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16 flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div variants={fadeInUp} className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Lokesh Reddy"
                width={200}
                height={200}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-2 text-primary">
              Lokesh Reddy Thettu
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-6">
              Data Scientist | Flutter Developer | Problem Solver
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button variant="outline" size="icon" asChild className="text-primary border-primary hover:bg-primary/10">
                <a
                  href="https://www.linkedin.com/in/Lokesh-Reddy-Thettu"
                  target="_blank"
                  aria-label="LinkedIn"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="text-primary border-primary hover:bg-primary/10">
                <a href="https://github.com/beastoninvictous" target="_blank" aria-label="GitHub" rel="noreferrer">
                  <GithubIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="text-primary border-primary hover:bg-primary/10">
                <a href="mailto:lokeshreddythettu@gmail.com" aria-label="Email">
                  <MailIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="text-primary border-primary hover:bg-primary/10">
                <a href="tel:+917670911715" aria-label="Phone">
                  <PhoneIcon className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Download Resume
              </Button>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Skills
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Tabs defaultValue="languages" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              </TabsList>
              {Object.entries(skills).map(([category, skillList]) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-base py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
                      >
                        {skill}
                      </Badge>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5 }} className="h-full">
                <Card className="overflow-hidden h-full border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2 bg-primary/5">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-primary">{project.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {project.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-base">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-primary/10 hover:bg-primary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto text-primary group" asChild>
                      <a href={project.link} target="_blank" rel="noreferrer">
                        View Project{" "}
                        <ExternalLinkIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Certificates
          </motion.h2>
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-card border rounded-lg p-4 hover:border-primary transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <h4 className="font-medium text-lg text-primary">{cert.name}</h4>
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  <div className="mt-auto pt-4">
                    <Badge variant="outline" className="bg-primary/5">
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Achievements
          </motion.h2>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ x: 5 }}>
                <Card className="overflow-hidden border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-primary">{achievement.title}</CardTitle>
                      <Badge variant="outline">{achievement.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{achievement.description}</p>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Work Experience
          </motion.h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary"
              >
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary transform -translate-x-1/2"></div>
                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="pb-2 px-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="text-xl text-primary">{job.company}</CardTitle>
                        <CardDescription className="text-base font-medium">{job.role}</CardDescription>
                      </div>
                      <Badge variant="outline" className="md:self-start whitespace-nowrap">
                        {job.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-0">
                    <ul className="space-y-2 mt-2">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRightIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{responsibility}</span>
                        </li>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Education
          </motion.h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary">
                  <CardHeader className="bg-primary/5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <CardTitle className="text-primary">{edu.degree}</CardTitle>
                        <CardDescription className="text-base">
                          {edu.institution}, {edu.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="md:self-start whitespace-nowrap">
                        {edu.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-primary">{edu.grade}</span>
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
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="py-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8 text-center text-primary">
            Get In Touch
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <Card className="max-w-2xl mx-auto border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary">Contact Information</CardTitle>
                <CardDescription>Feel free to reach out for opportunities or collaborations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <MailIcon className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:lokeshreddythettu@gmail.com"
                    className="hover:text-primary transition-colors group-hover:underline"
                  >
                    lokeshreddythettu@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                  <a href="tel:+917670911715" className="hover:text-primary transition-colors group-hover:underline">
                    +91-7670911715
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <LinkedinIcon className="h-5 w-5 text-primary" />
                  <a
                    href="https://www.linkedin.com/in/Lokesh-Reddy-Thettu"
                    target="_blank"
                    className="hover:text-primary transition-colors group-hover:underline"
                    rel="noreferrer"
                  >
                    linkedin.com/in/Lokesh-Reddy-Thettu
                  </a>
                </div>
                <div className="flex items-center gap-3 group">
                  <GithubIcon className="h-5 w-5 text-primary" />
                  <a
                    href="https://github.com/beastoninvictous"
                    target="_blank"
                    className="hover:text-primary transition-colors group-hover:underline"
                    rel="noreferrer"
                  >
                    github.com/beastoninvictous
                  </a>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.section>
      </main>

      <footer className="border-t border-border py-8 text-center text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>©️ {new Date().getFullYear()} Lokesh Reddy Thettu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
