"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { ExternalLink, ArrowRight } from "lucide-react"

export default function Page() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const blogPosts = [
    { title: "The Future of Cybersecurity in 2024", category: "Security", height: "h-48" },
    { title: "Building Scalable Microservices Architecture", category: "Development", height: "h-64" },
    { title: "Zero Trust Security Implementation", category: "Security", height: "h-40" },
    { title: "AI-Driven Development Workflows", category: "Innovation", height: "h-56" },
    { title: "Cloud Infrastructure Best Practices", category: "DevOps", height: "h-44" },
    { title: "Modern Authentication Systems", category: "Security", height: "h-52" },
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
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <Link href="#who-we-are" className="hover:text-gray-300 transition-colors">
              WHO WE ARE
            </Link>
            <Link href="#offerings" className="hover:text-gray-300 transition-colors">
              OFFERINGS
            </Link>
            <Link href="#thinking" className="hover:text-gray-300 transition-colors">
              THINKING
            </Link>
            <Link href="#showcase" className="hover:text-gray-300 transition-colors">
              SHOWCASE
            </Link>
            <Link href="#connect" className="hover:text-gray-300 transition-colors">
              CONNECT
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button className="text-sm">EN</button>
            <button className="flex flex-col space-y-1">
              <span className="h-0.5 w-6 bg-white"></span>
              <span className="h-0.5 w-6 bg-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative px-6 pt-24">
        {/* Multiple gradient blobs for enhanced visual depth */}
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 opacity-20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-15 blur-3xl animate-[pulse_8s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-1/3 bottom-1/4 h-[250px] w-[250px] rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 opacity-10 blur-3xl animate-[pulse_10s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.7}px)` }}
          aria-hidden="true"
        />

        <div className="relative min-h-screen flex flex-col justify-center px-4 md:px-0">
          <h1 className="max-w-3xl text-6xl md:text-7xl font-light leading-tight tracking-tight">
            KODEX STUDIO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              SECURE DIGITAL
            </span>
            <br />
            INNOVATION.
          </h1>

          <div className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end space-y-8 md:space-y-0">
            <div className="max-w-md">
              <Button
                variant="outline"
                className="rounded-full border border-white/30 bg-black/50 text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] px-6 md:px-8 py-3 font-medium tracking-wide transition-all duration-300 text-sm md:text-base backdrop-blur-sm"
              >
                <span className="relative z-10">DISCUSS YOUR PROJECT</span>
              </Button>
              <p className="mt-6 md:mt-8 text-sm leading-relaxed text-gray-400">
                PIONEERING SECURE SOLUTIONS FOR
                <br />
                THE DIGITAL FUTURE.
              </p>
            </div>

            <div className="flex items-center md:items-end">
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm">SCROLL TO EXPLORE</span>
                <span className="h-px w-8 md:w-12 bg-white"></span>
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
          className="absolute left-0 top-[100vh] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-10 blur-3xl animate-[pulse_12s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-[150vh] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-purple-600 via-violet-500 to-blue-500 opacity-15 blur-3xl animate-[pulse_14s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/3 top-[200vh] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-sage-400 via-emerald-400 to-teal-400 opacity-12 blur-3xl animate-[pulse_16s_ease-in-out_infinite]"
          style={{ transform: `translateY(${scrollY * 0.8}px)` }}
          aria-hidden="true"
        />
      </div>

      {/* Who We Are Section */}
      <section id="who-we-are" className="relative py-32 px-6">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-white">WHO WE ARE</h2>
              <div className="h-px w-24 bg-gradient-to-r from-purple-400 to-cyan-400 mb-8"></div>
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
              <div className="aspect-square bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
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
      <section id="offerings" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center text-white">OUR EXPERTISE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-transparent border border-white/10 hover:border-purple-400/30 transition-all duration-300">
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

            <Card className="bg-transparent border border-white/10 hover:border-purple-400/30 transition-all duration-300">
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

            <Card className="bg-transparent border border-white/10 hover:border-purple-400/30 transition-all duration-300">
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
      <section id="thinking" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-5xl font-light text-white">OUR THINKING</h2>
            <Button
              variant="outline"
              className="rounded-full border border-white/30 bg-black/50 text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-sm font-medium tracking-wide transition-all duration-300"
            >
              VIEW ALL POSTS <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className={`${post.height} border border-white/10 hover:border-emerald-400/30 transition-all duration-300 break-inside-avoid cursor-pointer group rounded-lg backdrop-blur-sm`}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-emerald-400 mb-3 font-medium tracking-wide">{post.category}</div>
                    <h3 className="text-lg font-light leading-tight text-white group-hover:text-emerald-300 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mt-4 group-hover:text-emerald-400 transition-colors">
                    <span>READ MORE</span>
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light mb-16 text-center text-white">PROJECT SHOWCASE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-white/10 hover:border-purple-400/30 transition-all duration-300 group overflow-hidden rounded-lg backdrop-blur-sm"
              >
                <div className="aspect-video bg-gray-800 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex space-x-4">
                    <Link
                      href={project.demo}
                      className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      LIVE DEMO
                    </Link>
                    <Link
                      href={project.caseStudy}
                      className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ArrowRight className="mr-2 h-3 w-3" />
                      CASE STUDY
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-8 text-white">LET'S CONNECT</h2>
            <div className="h-px w-24 bg-white mx-auto mb-8"></div>
            <p className="text-gray-400 text-lg">
              Ready to build something secure and extraordinary? Tell us about your project.
            </p>
          </div>

          <Card className="bg-transparent border border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">NAME</label>
                    <Input
                      className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 rounded-lg backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">EMAIL</label>
                    <Input
                      className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 rounded-lg backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2 font-light tracking-wide">PROJECT SCOPE</label>
                  <Select>
                    <SelectTrigger className="bg-black/30 border border-white/20 text-white focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 rounded-lg backdrop-blur-sm">
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
                    className="bg-black/30 border border-white/20 text-white placeholder:text-gray-600 focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 min-h-32 rounded-lg backdrop-blur-sm resize-none"
                    placeholder="Tell us about your project, timeline, and specific requirements..."
                  />
                </div>

                <Button className="w-full bg-black/50 border border-white/30 text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] py-3 rounded-lg font-medium tracking-wide transition-all duration-300 backdrop-blur-sm">
                  SEND MESSAGE
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
            <div className="text-sm text-gray-400">© 2024 KODEX STUDIO. ALL RIGHTS RESERVED.</div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                PRIVACY
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                TERMS
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
