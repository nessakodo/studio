"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { ExternalLink, ArrowRight, ChevronUp } from "lucide-react"

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - 80, // Adjust for fixed header height
      })
    }
    setIsMobileMenuOpen(false)
  }

  const blogPosts = [
    { 
      title: "The Future of Cybersecurity in 2024", 
      category: "Security",
      date: "March 15, 2024",
      readTime: "5 min read",
      excerpt: "Exploring the emerging trends and technologies that will shape cybersecurity in the coming year."
    },
    { 
      title: "Building Scalable Microservices Architecture", 
      category: "Development",
      date: "March 10, 2024",
      readTime: "7 min read",
      excerpt: "A comprehensive guide to designing and implementing scalable microservices."
    },
    { 
      title: "Zero Trust Security Implementation", 
      category: "Security",
      date: "March 5, 2024",
      readTime: "6 min read",
      excerpt: "Understanding and implementing zero trust security principles in modern applications."
    },
    { 
      title: "AI-Driven Development Workflows", 
      category: "Innovation",
      date: "February 28, 2024",
      readTime: "8 min read",
      excerpt: "How AI is transforming software development processes and workflows."
    },
    { 
      title: "Cloud Infrastructure Best Practices", 
      category: "DevOps",
      date: "February 20, 2024",
      readTime: "6 min read",
      excerpt: "Essential practices for building and maintaining robust cloud infrastructure."
    },
    { 
      title: "Modern Authentication Systems", 
      category: "Security",
      date: "February 15, 2024",
      readTime: "5 min read",
      excerpt: "Implementing secure and user-friendly authentication in modern applications."
    },
  ]

  const projects = [
    {
      title: "FinTech Security Platform",
      description: "End-to-end security solution for financial institutions with real-time threat detection.",
      image: "/placeholder.svg?height=300&width=400",
      demo: "#",
      caseStudy: "#",
    },
    {
      title: "Healthcare Data Management",
      description: "HIPAA-compliant platform for secure patient data management and analytics.",
      image: "/placeholder.svg?height=300&width=400",
      demo: "#",
      caseStudy: "#",
    },
    {
      title: "E-commerce Automation Suite",
      description: "Complete automation solution for inventory, orders, and customer management.",
      image: "/placeholder.svg?height=300&width=400",
      demo: "#",
      caseStudy: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-sm">
        <div className="flex items-center justify-between p-6">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm ml-auto">
            <Link href="#who-we-are" onClick={() => scrollToSection('who-we-are')} className="hover:text-gray-300 transition-colors">
              WHO WE ARE
            </Link>
            <Link href="#offerings" onClick={() => scrollToSection('offerings')} className="hover:text-gray-300 transition-colors">
              OFFERINGS
            </Link>
            <Link href="#thinking" onClick={() => scrollToSection('thinking')} className="hover:text-gray-300 transition-colors">
              THINKING
            </Link>
            <Link href="#showcase" onClick={() => scrollToSection('showcase')} className="hover:text-gray-300 transition-colors">
              SHOWCASE
            </Link>
            <Link href="#connect" onClick={() => scrollToSection('connect')} className="hover:text-gray-300 transition-colors">
              CONNECT
            </Link>
          </nav>
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="h-0.5 w-6 bg-white"></span>
            <span className="h-0.5 w-6 bg-white"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white text-2xl">&times;</button>
        </div>
        <div className="p-6">
          <nav className="flex flex-col space-y-6 text-lg text-center">
            <Link 
              href="#who-we-are" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => scrollToSection('who-we-are')}
            >
              WHO WE ARE
            </Link>
            <Link 
              href="#offerings" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => scrollToSection('offerings')}
            >
              OFFERINGS
            </Link>
            <Link 
              href="#thinking" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => scrollToSection('thinking')}
            >
              THINKING
            </Link>
            <Link 
              href="#showcase" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => scrollToSection('showcase')}
            >
              SHOWCASE
            </Link>
            <Link 
              href="#connect" 
              className="hover:text-gray-300 transition-colors"
              onClick={() => scrollToSection('connect')}
            >
              CONNECT
            </Link>
          </nav>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Hero Section */}
      <main className="relative px-6 md:px-24 pt-24">
        {/* Gradient blobs */}
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-sage-600 via-mist-500 to-mint-400 opacity-20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-mist-500 via-sage-500 to-mint-500 opacity-15 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-1/3 bottom-1/4 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-mint-400 via-mist-400 to-sage-400 opacity-10 blur-3xl animate-[pulse_10s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.7}px)` }}
          aria-hidden="true"
        />

        <div className="relative min-h-screen flex flex-col justify-center">
          <h1 className="max-w-3xl text-6xl md:text-7xl font-light leading-tight tracking-tight">
            KODEX STUDIO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400">
              SECURE DIGITAL
            </span>
            <br />
            INNOVATION.
          </h1>

          <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end space-y-8 md:space-y-0">
            <div className="max-w-md">
              <Button
                variant="outline"
                className="rounded-lg border border-white/30 bg-black/50 text-white hover-glow px-6 md:px-8 py-3 font-medium tracking-wide transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
              >
                <span className="relative z-10">DISCUSS YOUR PROJECT</span>
              </Button>
              <p className="mt-6 md:mt-8 text-sm leading-relaxed text-gray-400">
                PIONEERING SECURE SOLUTIONS FOR
                <br />
                THE DIGITAL FUTURE.
              </p>
            </div>

            <div className="flex items-center md:items-end w-full md:w-auto">
              <div className="flex items-center space-x-2 flex-grow md:flex-grow-0">
                <span className="text-xs md:text-sm">SCROLL TO EXPLORE</span>
                <span className="h-px bg-white flex-grow md:flex-grow-0 md:w-12"></span>
              </div>
            </div>
          </div>

          <p className="mt-24 max-w-xl text-sm leading-relaxed text-gray-400">
            At Kodex Studio, we architect the future of digital security. Our innovative solutions blend cutting-edge
            technology with uncompromising protection, creating systems that don't just meet today's needs—they
            anticipate tomorrow's challenges.
          </p>
        </div>
      </main>

      {/* Gradient overlay that flows through sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-sage-600 via-mist-500 to-mint-400 opacity-20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-mist-500 via-sage-500 to-mint-500 opacity-15 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-1/3 bottom-1/4 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-mint-400 via-mist-400 to-sage-400 opacity-10 blur-3xl animate-[pulse_10s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.7}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/4 top-[120vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-mint-500 via-mist-500 to-blue-500 opacity-10 blur-3xl animate-[pulse_15s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-[150vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-sage-600 via-violet-500 to-mist-500 opacity-15 blur-3xl animate-[pulse_14s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/3 top-[180vh] h-[320px] w-[320px] rounded-full bg-gradient-to-br from-mist-500 via-sage-500 to-mint-500 opacity-12 blur-3xl animate-[pulse_17s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.7}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-1/3 top-[220vh] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-mint-500 via-mist-500 to-sage-500 opacity-15 blur-3xl animate-[pulse_19s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.9}px)` }}
          aria-hidden="true"
        />
         <div
          className="absolute left-1/4 top-[280vh] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-600 via-sage-500 to-mist-400 opacity-10 blur-3xl animate-[pulse_21s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-1/2 top-[330vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-mist-500 via-blue-500 to-mint-500 opacity-12 blur-3xl animate-[pulse_23s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.8}px)` }}
          aria-hidden="true"
        />
      </div>

      {/* Who We Are Section */}
      <section id="who-we-are" className="relative py-32 px-6 md:px-24">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-white">WHO WE ARE</h2>
              <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mb-8"></div>
              <p className="text-lg leading-relaxed text-gray-300 mb-6">
                Kodex Studio is where security meets innovation. We're a collective of visionary engineers, security
                architects, and creative technologists who believe that the most powerful solutions are born from the
                intersection of protection and possibility.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our mission is simple yet profound: to build digital ecosystems that are not only secure and scalable
                but also beautifully crafted and future-ready. Every line of code we write, every system we design, is a
                step toward a more secure digital tomorrow.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage-600/30 to-mist-600/30 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r from-mist-400 to-mint-400">
                    100+
                  </div>
                  <div className="text-sm text-gray-400">SECURE SOLUTIONS DELIVERED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className="py-32 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center text-white">OUR EXPERTISE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-transparent border border-white/10 hover:border-mist-400/30 transition-all duration-300 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-white">FUTURE-PROOF SOFTWARE</h3>
                <p className="text-gray-400 mb-6">
                  We craft intelligent, secure applications that evolve with your business. Our development philosophy
                  combines cutting-edge technology with battle-tested security principles.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Next-Gen Web & Mobile Apps</li>
                  <li>• Secure API Ecosystems</li>
                  <li>• Cloud-Native Architecture</li>
                  <li>• AI-Enhanced Solutions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/10 hover:border-mist-400/30 transition-all duration-300 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-white">SECURITY INTELLIGENCE</h3>
                <p className="text-gray-400 mb-6">
                  Our security experts don't just find vulnerabilities—we architect comprehensive defense strategies
                  that anticipate and neutralize emerging threats.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Advanced Threat Assessment</li>
                  <li>• Zero-Trust Implementation</li>
                  <li>• Compliance & Governance</li>
                  <li>• Security Culture Development</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/10 hover:border-mist-400/30 transition-all duration-300 rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-white">DIGITAL TRANSFORMATION</h3>
                <p className="text-gray-400 mb-6">
                  Complete ecosystem transformation that doesn't just digitize—it revolutionizes. We reimagine business
                  processes through the lens of security and innovation.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Strategic Digital Planning</li>
                  <li>• Infrastructure Modernization</li>
                  <li>• Automated Security Operations</li>
                  <li>• Continuous Innovation Support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Thinking Section */}
      <section id="thinking" className="py-32 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-white">THINKING</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="bg-transparent border border-white/10 hover:border-mist-400/30 transition-all duration-300 h-[400px] rounded-lg">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <span className="text-sm text-gray-400 mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-light mb-4 text-white">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border border-white/30 bg-black/50 text-white hover-glow"
                    >
                      READ MORE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-32 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light mb-16 text-center text-white">PROJECT SHOWCASE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-transparent border border-white/10 hover:border-mint-400/30 transition-all duration-300 h-[400px] group rounded-lg"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="aspect-video bg-gray-800 overflow-hidden rounded-lg mb-6">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light mb-3 text-white group-hover:text-mint-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="mt-auto flex space-x-4 justify-center">
                    <Button
                      variant="outline"
                      className="rounded-lg border border-white/30 bg-black/50 text-white hover-glow flex items-center text-sm"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      LIVE DEMO
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg border border-white/30 bg-black/50 text-white hover-glow flex items-center text-sm"
                    >
                      <ArrowRight className="mr-2 h-3 w-3" />
                      CASE STUDY
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-32 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-8 text-white">LET'S CONNECT</h2>
            <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mx-auto mb-8"></div>
            <p className="text-gray-400 text-lg">
              Ready to build something secure and extraordinary? Tell us about your project.
            </p>
          </div>

          <Card className="bg-transparent border border-white/10 backdrop-blur-sm rounded-lg">
            <CardContent className="p-8 md:p-12">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">NAME</label>
                    <Input
                      className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-mint-400/50 focus:ring-1 focus:ring-mint-400/20 rounded-lg backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">EMAIL</label>
                    <Input
                      className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-mint-400/50 focus:ring-1 focus:ring-mint-400/20 rounded-lg backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">PROJECT SCOPE</label>
                  <Select>
                    <SelectTrigger className="bg-black/30 border border-white/20 text-white focus:border-mint-400/50 focus:ring-1 focus:ring-mint-400/20 rounded-lg backdrop-blur-sm">
                      <SelectValue placeholder="Select project type" className="text-gray-600" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border border-white/20 backdrop-blur-sm">
                      <SelectItem value="software">Custom Software Development</SelectItem>
                      <SelectItem value="security">Security Audit & Consulting</SelectItem>
                      <SelectItem value="end-to-end">End-to-End Solution</SelectItem>
                      <SelectItem value="consultation">Strategic Consultation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">PROJECT DETAILS</label>
                  <Textarea
                    className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-mint-400/50 focus:ring-1 focus:ring-mint-400/20 min-h-32 rounded-lg backdrop-blur-sm resize-none"
                    placeholder="Tell us about your project, timeline, and specific requirements..."
                  />
                </div>

                <Button className="w-full rounded-lg bg-black/50 border border-white/30 text-white hover-glow py-3 font-medium tracking-wide transition-all duration-300 backdrop-blur-sm">
                  SEND MESSAGE
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex space-x-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
              <p className="text-sm text-gray-400">© 2024 Kodex Studio. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
