"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Zap,
  Users,
  GraduationCap,
  Award,
  MapPin,
  Send,
  Menu,
  X,
  Server,
  Brain,
  Cloud,
  Download,
  Calendar,
  Target,
  TrendingUp,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Languages,
  Star,
  Lightbulb,
  BookOpen,
  Activity,
  Eye,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentProjectImage, setCurrentProjectImage] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  const nextProjectImage = (projectId: string, maxImages: number) => {
    setCurrentProjectImage((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % maxImages,
    }))
  }

  const prevProjectImage = (projectId: string, maxImages: number) => {
    setCurrentProjectImage((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + maxImages) % maxImages,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Malak Zaidi
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                About
              </a>
              <a href="#skills" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Skills
              </a>
              <a href="#projects" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Projects
              </a>
              <a
                href="#certifications"
                className="text-foreground hover:text-emerald-600 transition-colors font-medium"
              >
                Certifications
              </a>
              <a href="#languages" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Languages
              </a>
              <a href="#why-me" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Why Me?
              </a>
              <a href="#experience" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Experience
              </a>
              <a href="#contact" className="text-foreground hover:text-emerald-600 transition-colors font-medium">
                Contact
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
                <a href="#home" className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors">
                  Home
                </a>
                <a href="#about" className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors">
                  About
                </a>
                <a href="#skills" className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors">
                  Skills
                </a>
                <a
                  href="#projects"
                  className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#certifications"
                  className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors"
                >
                  Certifications
                </a>
                <a
                  href="#languages"
                  className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors"
                >
                  Languages
                </a>
                <a href="#why-me" className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors">
                  Why Me?
                </a>
                <a
                  href="#experience"
                  className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors"
                >
                  Experience
                </a>
                <a href="#contact" className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors">
                  Contact
                </a>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="block px-3 py-2 text-foreground hover:text-emerald-600 transition-colors w-full text-left"
                  >
                    {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-background via-background to-emerald-50/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 text-sm font-semibold border border-emerald-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>🎯 Seeking AI/ML & Data
                  Science Internships • Available Immediately
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                    Malak Zaidi
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground text-pretty font-medium">
                  AI/ML Engineer & Full-Stack Developer | Transforming Data into Intelligent Solutions
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                  MSc candidate specializing in{" "}
                  <strong>Machine Learning, Deep Learning, and Distributed Systems</strong>. Proven track record in{" "}
                  <strong>MLOps, LLM fine-tuning, multi-agent systems</strong>, and
                  <strong>production-ready AI applications</strong>. Passionate about leveraging cutting-edge AI to
                  solve real-world business challenges.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent shadow-sm"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Portfolio
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <a
                  href="https://github.com/malakzaidi"
                  className="text-muted-foreground hover:text-emerald-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/malak-zaidi/"
                  className="text-muted-foreground hover:text-emerald-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:e.malakzaidi@gmail.com"
                  className="text-muted-foreground hover:text-emerald-600 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                  <Image
                    src="/professional-ai-engineer-portrait.jpg"
                    alt="Malak Zaidi - AI/ML Engineer & Full-Stack Developer"
                    width={500}
                    height={600}
                    className="rounded-xl object-cover w-full h-[600px]"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-border animate-in slide-in-from-bottom duration-1000 delay-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">95% Accuracy</div>
                    <div className="text-sm text-muted-foreground">AI Models</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-border animate-in slide-in-from-top duration-1000 delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold">10+ Projects</div>
                    <div className="text-sm text-muted-foreground">Production Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Passionate AI researcher and software engineer with expertise in machine learning, distributed systems,
              and sustainable technology solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                As a highly motivated <strong>AI Master's student</strong> specializing in Artificial Intelligence and
                Distributed Systems, I bring a unique combination of{" "}
                <strong>theoretical knowledge and practical implementation skills</strong>. My expertise spans{" "}
                <strong>machine learning model development, MLOps pipelines, and scalable system architecture</strong>.
              </p>
              <p className="text-muted-foreground text-pretty leading-relaxed">
                Currently based in Casablanca, Morocco, I'm actively researching{" "}
                <strong>advanced AI applications in distributed environments</strong> while focusing on{" "}
                <strong>green technology and sustainable AI solutions</strong>. I speak five languages and believe in
                leveraging technology to create positive environmental and social impact through innovative AI
                solutions.
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">Key Achievements</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• 95% accuracy in healthcare AI model development</li>
                  <li>• 40% reduction in clinical reporting time through automation</li>
                  <li>• 7% improvement in LLM code generation performance</li>
                  <li>• Production-ready MLOps pipelines with Docker & Airflow</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                <Brain className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">AI Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  Cutting-edge ML/DL solutions with measurable business impact
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                <Target className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Results-Driven</h4>
                <p className="text-sm text-muted-foreground">
                  Proven track record of delivering high-performance AI systems
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                <Users className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Team Leadership</h4>
                <p className="text-sm text-muted-foreground">Collaborative approach with strong communication skills</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                <Zap className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Rapid Learning</h4>
                <p className="text-sm text-muted-foreground">Quick adaptation to new technologies and frameworks</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Comprehensive technical stack spanning AI/ML, cloud computing, and full-stack development
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Core AI/ML Skills */}
            <Card className="p-6 border-l-4 border-l-emerald-500">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-emerald-600" />
                AI & Machine Learning
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Deep Learning & Neural Networks
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  PyTorch & TensorFlow
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  NLP & Large Language Models
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Computer Vision & CNNs
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Multi-Agent Systems (CrewAI)
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Reinforcement Learning
                </Badge>
              </div>
            </Card>

            {/* MLOps & Production */}
            <Card className="p-6 border-l-4 border-l-blue-500">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Cloud className="mr-2 h-5 w-5 text-blue-600" />
                MLOps & Production
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Apache Airflow & MLflow
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Docker & Kubernetes
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  CI/CD & Model Deployment
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Weights & Biases (W&B)
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Model Monitoring & A/B Testing
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Cloud Platforms (AWS/GCP)
                </Badge>
              </div>
            </Card>

            {/* Full-Stack Development */}
            <Card className="p-6 border-l-4 border-l-purple-500">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Server className="mr-2 h-5 w-5 text-purple-600" />
                Full-Stack Development
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Python & Java Spring Boot
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  React.js & Angular
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Microservices Architecture
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  PostgreSQL & MongoDB
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  REST APIs & GraphQL
                </Badge>
                <Badge variant="outline" className="justify-center py-2 font-medium">
                  Git/GitHub & Agile
                </Badge>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Data Science & Analytics */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Code className="mr-2 h-5 w-5 text-emerald-600" />
                Data Science & Analytics
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="outline" className="justify-center py-2">
                  Python (Pandas, NumPy)
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  R Programming
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  SQL & NoSQL Databases
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Statistical Analysis
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Data Visualization
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Power BI & Tableau
                </Badge>
              </div>
            </Card>

            {/* Soft Skills & Languages */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-6 flex items-center">
                <Users className="mr-2 h-5 w-5 text-emerald-600" />
                Leadership & Communication
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <Badge variant="outline" className="justify-center py-2">
                  Project Management
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Technical Writing
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Cross-functional Collaboration
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Mentoring & Training
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  5 Languages Fluent
                </Badge>
                <Badge variant="outline" className="justify-center py-2">
                  Public Speaking
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Production-ready AI/ML solutions with measurable business impact and technical excellence
            </p>
          </div>

          {/* ================= AI & MACHINE LEARNING PROJECTS ================= */}
          <h3 className="text-2xl font-semibold mb-8 text-center">🤖 AI & Machine Learning Solutions</h3>
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Multi-Agent MRI Report Generation */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Multi-Agent Healthcare AI System</CardTitle>
                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                    Featured
                  </Badge>
                </div>
                <CardDescription className="text-base">CrewAI • Healthcare AI • Production Ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1749227117777.jpg-XYHaR0j06ShVDOBAKCHTNmwKVDJqxy.jpeg",
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1749227116265.jpg-tXH7spT9KSuFgomvacFRrv1giXD5YR.jpeg",
                        `/placeholder.svg?height=300&width=500&query=multi-agent system architecture diagram with specialized AI agents`,
                      ]
                      const currentIndex = currentProjectImage["healthcare-ai"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`Healthcare AI System - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Interface Dashboard", "Generated Report", "System Architecture"]
                          return labels[currentProjectImage["healthcare-ai"] || 0]
                        })()}
                      </Badge>
                    </div>
                    {/* Image indicators */}
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["healthcare-ai"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("healthcare-ai", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("healthcare-ai", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🏥 <strong>Revolutionary healthcare AI system</strong> combining multiple specialized agents for MRI
                  analysis
                  <br />🎯 <strong>95% diagnostic accuracy</strong> with 40% faster reporting time
                  <br />🔬 Integrated <strong>ClinicalBERT, DeepSeek-R1, Google Speech-to-Text</strong>
                  <br />⚡ <strong>Flask REST APIs</strong> with ChromaDB vector storage
                  <br />💡 <strong>Real-world impact:</strong> Deployed in clinical research environment
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Python</Badge>
                  <Badge>PyTorch</Badge>
                  <Badge>LangChain</Badge>
                  <Badge>ClinicalBERT</Badge>
                  <Badge>CrewAI</Badge>
                  <Badge>ChromaDB</Badge>
                  <Badge>Flask</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fine-Tuning LLaMA */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl">LLaMA 3.2 Fine-Tuning for Code Generation</CardTitle>
                <CardDescription className="text-base">LLM Optimization • Model Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        `/placeholder.svg?height=300&width=500&query=LLM fine-tuning training dashboard with loss curves and metrics`,
                        `/placeholder.svg?height=300&width=500&query=QLoRA architecture diagram with parameter efficient fine-tuning`,
                        `/placeholder.svg?height=300&width=500&query=HumanEval benchmark results comparison chart`,
                      ]
                      const currentIndex = currentProjectImage["llama-finetuning"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`LLaMA Fine-tuning - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Training Dashboard", "QLoRA Architecture", "Benchmark Results"]
                          return labels[currentProjectImage["llama-finetuning"] || 0]
                        })()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["llama-finetuning"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("llama-finetuning", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("llama-finetuning", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🚀 <strong>Advanced LLM optimization</strong> using QLoRA for efficient single-GPU training
                  <br />📊 <strong>22% pass@1 score</strong> (+7% improvement) on HumanEval benchmark
                  <br />💾 Trained on <strong>8K+ programming tasks</strong> with memory-efficient techniques
                  <br />
                  🛠️ <strong>Production stack:</strong> PyTorch, Hugging Face, TRL, Unsloth
                  <br />🎯 <strong>Business value:</strong> Automated code generation for development teams
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>LLM Fine-tuning</Badge>
                  <Badge>QLoRA</Badge>
                  <Badge>PyTorch</Badge>
                  <Badge>Hugging Face</Badge>
                  <Badge>Unsloth</Badge>
                  <Badge>HumanEval</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Metrics
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Research Paper
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* MLOps Sales Forecasting */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise MLOps Pipeline</CardTitle>
                <CardDescription className="text-base">Production MLOps • Automation • Scalability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        `/placeholder.svg?height=300&width=500&query=MLOps pipeline dashboard with Airflow DAGs and monitoring`,
                        `/placeholder.svg?height=300&width=500&query=MLflow experiment tracking interface with model metrics`,
                        `/placeholder.svg?height=300&width=500&query=Docker containerized ML deployment architecture diagram`,
                      ]
                      const currentIndex = currentProjectImage["mlops-pipeline"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`MLOps Pipeline - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Pipeline Dashboard", "Experiment Tracking", "Deployment Architecture"]
                          return labels[currentProjectImage["mlops-pipeline"] || 0]
                        })()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["mlops-pipeline"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("mlops-pipeline", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("mlops-pipeline", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🏭 <strong>End-to-end ML pipeline</strong> for enterprise sales forecasting
                  <br />🔄 <strong>Automated workflows</strong> with Apache Airflow orchestration
                  <br />📈 <strong>Experiment tracking</strong> with MLflow and model versioning
                  <br />🐳 <strong>Containerized deployment</strong> using Docker + MinIO storage
                  <br />
                  ⚙️ <strong>Enterprise ready:</strong> CI/CD integration with monitoring
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Apache Airflow</Badge>
                  <Badge>MLflow</Badge>
                  <Badge>Docker</Badge>
                  <Badge>MinIO</Badge>
                  <Badge>CI/CD</Badge>
                  <Badge>Monitoring</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Code className="mr-2 h-4 w-4" />
                  View Architecture
                </Button>
              </CardContent>
            </Card>

            {/* Educational ChatBot */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-xl">AI-Powered Educational Assistant</CardTitle>
                <CardDescription className="text-base">RAG System • Java + AI • ENSET Partnership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        `/placeholder.svg?height=300&width=500&query=educational chatbot interface with student conversation`,
                        `/placeholder.svg?height=300&width=500&query=RAG system architecture with knowledge base and retrieval`,
                        `/placeholder.svg?height=300&width=500&query=Spring Boot backend dashboard with API endpoints`,
                      ]
                      const currentIndex = currentProjectImage["educational-chatbot"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`Educational Chatbot - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Chat Interface", "RAG Architecture", "Backend Dashboard"]
                          return labels[currentProjectImage["educational-chatbot"] || 0]
                        })()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["educational-chatbot"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("educational-chatbot", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("educational-chatbot", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🎓 <strong>Intelligent tutoring system</strong> with RAG-based knowledge retrieval
                  <br />🔗 <strong>Hybrid architecture:</strong> Java Spring Boot + Python AI pipeline
                  <br />🧠 <strong>Context-aware responses</strong> using Sentence-Transformers + ChromaDB
                  <br />📚 <strong>Curriculum integration:</strong> Indexed course materials and textbooks
                  <br />🏫 <strong>Academic impact:</strong> Deployed for 500+ students at ENSET
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Java Spring Boot</Badge>
                  <Badge>RAG Pipeline</Badge>
                  <Badge>LangChain</Badge>
                  <Badge>ChromaDB</Badge>
                  <Badge>NLP</Badge>
                  <Badge>Educational AI</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= FULL-STACK PROJECTS ================= */}
          <h3 className="text-2xl font-semibold mb-8 text-center">💻 Full-Stack Applications</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Reverd Africa */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Reverd Africa Climate Platform</CardTitle>
                  <Badge className="bg-green-100 text-green-800">Graduation Project</Badge>
                </div>
                <CardDescription className="text-base">
                  Microservices • Climate Tech • Scalable Architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        `/placeholder.svg?height=300&width=500&query=climate platform dashboard with environmental data visualization`,
                        `/placeholder.svg?height=300&width=500&query=microservices architecture diagram with Spring Cloud components`,
                        `/placeholder.svg?height=300&width=500&query=React frontend interface for climate solutions platform`,
                      ]
                      const currentIndex = currentProjectImage["reverd-africa"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`Reverd Africa - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Platform Dashboard", "Microservices Architecture", "Frontend Interface"]
                          return labels[currentProjectImage["reverd-africa"] || 0]
                        })()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["reverd-africa"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("reverd-africa", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("reverd-africa", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🌍 <strong>Climate solutions platform</strong> for African environmental initiatives
                  <br />
                  🏗️ <strong>Microservices architecture</strong> with Spring Cloud & Netflix Eureka
                  <br />🔐 <strong>Enterprise security:</strong> JWT authentication & role-based access
                  <br />
                  ⚛️ <strong>Modern frontend:</strong> React.js with Material UI components
                  <br />🎯 <strong>Academic recognition:</strong> Praised for innovation & technical excellence
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Spring Boot</Badge>
                  <Badge>Spring Cloud</Badge>
                  <Badge>React.js</Badge>
                  <Badge>Microservices</Badge>
                  <Badge>Docker</Badge>
                  <Badge>Climate Tech</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Case Study
                </Button>
              </CardContent>
            </Card>

            {/* Digital Banking Application */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise Banking System</CardTitle>
                <CardDescription className="text-base">Spring Boot • Angular • Financial Services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-video relative">
                    {(() => {
                      const images = [
                        `/placeholder.svg?height=300&width=500&query=banking application dashboard with account management interface`,
                        `/placeholder.svg?height=300&width=500&query=Angular frontend with financial charts and transaction history`,
                        `/placeholder.svg?height=300&width=500&query=Spring Boot backend architecture with security layers`,
                      ]
                      const currentIndex = currentProjectImage["banking-system"] || 0
                      return (
                        <Image
                          src={images[currentIndex] || "/placeholder.svg"}
                          alt={`Banking System - View ${currentIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      )
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-black/50 text-white">
                        {(() => {
                          const labels = ["Banking Dashboard", "Frontend Interface", "Backend Architecture"]
                          return labels[currentProjectImage["banking-system"] || 0]
                        })()}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-1">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            (currentProjectImage["banking-system"] || 0) === index ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => prevProjectImage("banking-system", 3)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-y-0 right-2 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      onClick={() => nextProjectImage("banking-system", 3)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                  🏦 <strong>Full-featured banking application</strong> with secure transaction processing
                  <br />
                  🛡️ <strong>Enterprise security:</strong> Spring Security + JWT authentication
                  <br />📊 <strong>Interactive dashboards:</strong> Angular 16+ with Chart.js analytics
                  <br />
                  🗄️ <strong>Robust backend:</strong> JPA/Hibernate with MySQL database
                  <br />📋 <strong>API documentation:</strong> Swagger/OpenAPI for seamless integration
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Spring Boot</Badge>
                  <Badge>Spring Security</Badge>
                  <Badge>Angular</Badge>
                  <Badge>MySQL</Badge>
                  <Badge>Swagger</Badge>
                  <Badge>Chart.js</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    Backend
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Github className="mr-2 h-4 w-4" />
                    Frontend
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Experience</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Academic excellence combined with hands-on research experience in AI and distributed systems
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              <div className="relative flex items-center md:justify-center">
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-600 rounded-full transform md:-translate-x-1.5 z-10"></div>
                <Card className="ml-12 md:ml-0 md:w-5/12 md:mr-auto p-6 hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                          Current • 2025
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">Data Science Trainee</h3>
                      <p className="text-emerald-600 font-medium mb-2">
                        WorldQuant University Applied Data Science Lab
                      </p>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        <strong>Hands-on data science experience</strong> with real-world datasets and industry-standard
                        tools. Executing end-to-end ML projects, API integration, and advanced statistical analysis.
                        <strong>Key focus:</strong> Production-ready data pipelines and business intelligence solutions.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Python
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          SQL
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          MongoDB
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          APIs
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ML Pipelines
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Data Visualization
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Education Items */}
              <div className="relative flex items-center md:justify-center">
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-600 rounded-full transform md:-translate-x-1.5 z-10"></div>
                <Card className="ml-12 md:ml-0 md:w-5/12 md:ml-auto p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          2024 - 2026
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">MSc in Artificial Intelligence & Distributed Systems</h3>
                      <p className="text-blue-600 font-medium mb-2">ENSET Mohammedia, Morocco</p>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        <strong>Advanced specialization</strong> in machine learning, deep learning, NLP, and
                        distributed AI systems. Research focus on{" "}
                        <strong>multi-agent systems, LLM optimization, and sustainable AI</strong>. Hands-on experience
                        with <strong>PyTorch, TensorFlow, MLOps, and cloud deployment</strong>.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Deep Learning
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          NLP
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Multi-Agent Systems
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Distributed Computing
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Research Methods
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="relative flex items-center md:justify-center">
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-600 rounded-full transform md:-translate-x-1.5 z-10"></div>
                <Card className="ml-12 md:ml-0 md:w-5/12 md:mr-auto p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          2021 - 2024
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">BSc in Mathematical & Computer Sciences</h3>
                      <p className="text-purple-600 font-medium mb-2">FS Ben M'Sik, Casablanca</p>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        <strong>Strong foundation</strong> in algorithms, software engineering, and mathematical
                        modeling. Specialized in{" "}
                        <strong>Java enterprise development, React.js, and microservices architecture</strong>.
                        Developed <strong>leadership and public speaking skills</strong> through academic projects and
                        presentations.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Java
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Spring Boot
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          React.js
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Algorithms
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Mathematics
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Leadership
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="relative flex items-center md:justify-center">
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-emerald-600 rounded-full transform md:-translate-x-1.5 z-10"></div>
                <Card className="ml-12 md:ml-0 md:w-5/12 md:ml-auto p-6 hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Achievements
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">Professional Recognition</h3>
                      <p className="text-yellow-600 font-medium mb-2">Open Source & Academic Excellence</p>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        <strong>GitHub achievements:</strong> Pull Shark and Quickdraw for significant open-source
                        contributions.
                        <strong>Academic recognition:</strong> Outstanding graduation project presentation.
                        <strong>Multilingual communication:</strong> Fluent in 5 languages enabling global
                        collaboration.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Open Source
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          GitHub
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Multilingual
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Global Collaboration
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Validated expertise through industry-recognized certifications and professional achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Green Digital Skills</CardTitle>
                    <CardDescription>Sustainable Technology</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/green-digital-skills-certificate-with-official-sea.jpg"
                      alt="Green Digital Skills Certificate Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-emerald-500 text-white">Verified</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Certified in sustainable AI practices and green technology implementation for environmental impact
                  reduction.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    View PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Social Media Marketing</CardTitle>
                    <CardDescription>Digital Marketing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/social-media-marketing-certificate-with-coursera-b.jpg"
                      alt="Social Media Marketing Certificate Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500 text-white">Coursera</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Professional certification in digital marketing strategies and social media campaign optimization.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    View PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Verify on Coursera
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Server className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Data Management</CardTitle>
                    <CardDescription>Database Systems</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg overflow-hidden bg-muted">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/data-management-certificate-with-database-icons-an.jpg"
                      alt="Data Management Certificate Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-500 text-white">Professional</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Advanced certification in database design, data warehousing, and enterprise data management systems.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    View PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="languages" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Languages & Communication</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Multilingual communication enabling global collaboration and cross-cultural project management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                    <Languages className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">French</CardTitle>
                    <CardDescription>Native Proficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Native speaker with professional writing and presentation skills
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">English</CardTitle>
                    <CardDescription>Bilingual Proficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Fluent in technical communication and international collaboration
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Languages className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Arabic</CardTitle>
                    <CardDescription>Native Proficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">Native speaker enabling MENA region project leadership</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <Languages className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Turkish</CardTitle>
                    <CardDescription>Working Proficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <Star key={i + 3} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Professional working proficiency for business communication
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <Languages className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Chinese</CardTitle>
                    <CardDescription>Elementary Proficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                  ))}
                  {[...Array(3)].map((_, i) => (
                    <Star key={i + 2} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  Basic conversational skills for international tech collaboration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="why-me" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Me?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Unique combination of technical expertise, research experience, and global perspective that drives
              innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="p-6 border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Innovation-Driven Problem Solver</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I don't just implement existing solutions—I create novel approaches. My multi-agent healthcare AI
                      system achieved 95% accuracy by combining multiple specialized models, demonstrating my ability to
                      think beyond conventional boundaries and deliver breakthrough results.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Global Perspective & Cultural Intelligence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fluent in 5 languages with deep understanding of diverse markets. This multilingual ability
                      enables me to lead international projects, understand global user needs, and communicate complex
                      technical concepts across cultural boundaries—a crucial skill in today's interconnected tech
                      landscape.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Proven Track Record of Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      My projects deliver measurable business value: 40% faster medical reporting, 22% improvement in
                      code generation benchmarks, and production-ready MLOps pipelines. I focus on solutions that create
                      real-world impact, not just impressive demos.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">What Sets Me Apart</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Research-backed approach to AI development
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        End-to-end MLOps and production deployment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Sustainable AI and green technology focus
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Cross-functional collaboration and leadership
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-emerald-700 dark:text-emerald-300">
                        Rapid learning and technology adaptation
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-l-4 border-l-yellow-500">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold">Continuous Learning Mindset</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing advanced research in AI and distributed systems while actively contributing to
                  open-source projects. I stay ahead of technology trends and continuously expand my expertise to
                  deliver cutting-edge solutions.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Medium Articles
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Research Papers
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="activities" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Extracurricular & Activities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Leadership, community involvement, and professional development beyond academics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Open Source Contributor</CardTitle>
                    <CardDescription>GitHub Community</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Active contributor to AI/ML open source projects with Pull Shark and Quickdraw achievements. Mentoring
                  junior developers and contributing to community-driven initiatives.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Pull Shark</Badge>
                  <Badge variant="outline">Quickdraw</Badge>
                  <Badge variant="outline">Mentoring</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Tech Speaker & Presenter</CardTitle>
                    <CardDescription>Academic Conferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Regular presenter at university seminars and academic conferences, sharing research findings on AI
                  applications and sustainable technology solutions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Public Speaking</Badge>
                  <Badge variant="outline">Research Presentation</Badge>
                  <Badge variant="outline">Academic Writing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sustainability Advocate</CardTitle>
                    <CardDescription>Green Technology</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Passionate advocate for sustainable AI and green technology solutions. Leading initiatives to reduce
                  environmental impact of AI systems and promote responsible technology development.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Green AI</Badge>
                  <Badge variant="outline">Sustainability</Badge>
                  <Badge variant="outline">Environmental Impact</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Ready to discuss AI/ML opportunities? Let's explore how my expertise can contribute to your team's
              success.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="Internship Opportunity" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea placeholder="Tell me about the opportunity..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
                <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
                  I'm actively seeking <strong>AI/ML and Data Science internship opportunities</strong>. Open to
                  discussing innovative projects, research collaborations, and how I can contribute to your team's
                  technical objectives.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-emerald-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">e.malakzaidi@gmail.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <p className="text-muted-foreground">linkedin.com/in/malak-zaidi</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Location</h4>
                      <p className="text-muted-foreground">Casablanca, Morocco • Open to Remote</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 border-l-4 border-l-yellow-500">
                <h4 className="font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-yellow-600" />
                  Resources & Publications
                </h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Medium Blog Articles
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Research Reports & Papers
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Technical Documentation
                  </Button>
                </div>
              </Card>

              <div>
                <h4 className="font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-emerald-50 hover:border-emerald-600 bg-transparent dark:hover:bg-emerald-900/20"
                    asChild
                  >
                    <a href="https://github.com/malakzaidi" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:border-blue-600 bg-transparent dark:hover:bg-blue-900/20"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/malak-zaidi/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-emerald-50 hover:border-emerald-600 bg-transparent dark:hover:bg-emerald-900/20"
                    asChild
                  >
                    <a href="mailto:e.malakzaidi@gmail.com">
                      <Mail className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-orange-50 hover:border-orange-600 bg-transparent dark:hover:bg-orange-900/20"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                    Available for Immediate Start
                  </span>
                </div>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm leading-relaxed">
                  🎯 <strong>Seeking AI/ML & Data Science internships</strong>
                  <br />🚀 Ready to contribute to innovative projects and research
                  <br />🌍 Open to remote work and international opportunities
                  <br />📅 Available for interviews and technical assessments
                </p>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
                Malak Zaidi
              </div>
              <p className="text-muted-foreground mb-4 max-w-md text-pretty leading-relaxed">
                AI/ML Engineer and Full-Stack Developer passionate about creating intelligent solutions with
                cutting-edge technologies. Specializing in machine learning, distributed systems, and sustainable AI.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-emerald-50 hover:border-emerald-600 bg-transparent"
                  asChild
                >
                  <a href="https://github.com/malakzaidi" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-blue-50 hover:border-blue-600 bg-transparent"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/malak-zaidi/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-emerald-50 hover:border-emerald-600 bg-transparent"
                  asChild
                >
                  <a href="mailto:e.malakzaidi@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-muted-foreground hover:text-emerald-600 transition-colors">
                  About
                </a>
                <a href="#skills" className="block text-muted-foreground hover:text-emerald-600 transition-colors">
                  Skills
                </a>
                <a href="#projects" className="block text-muted-foreground hover:text-emerald-600 transition-colors">
                  Projects
                </a>
                <a href="#experience" className="block text-muted-foreground hover:text-emerald-600 transition-colors">
                  Experience
                </a>
                <a href="#contact" className="block text-muted-foreground hover:text-emerald-600 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Expertise</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground">AI & Machine Learning</p>
                <p className="text-muted-foreground">MLOps & Production</p>
                <p className="text-muted-foreground">Full-Stack Development</p>
                <p className="text-muted-foreground">Data Science & Analytics</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Malak Zaidi. All rights reserved. • Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
