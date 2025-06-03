"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { ExternalLink, ArrowRight, ChevronUp, Mail, Calendar } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config/emailjs';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Add this constant at the top of the file, after imports
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
      // Add or remove 'scrolled' class based on scroll position
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
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

  const navLinks = [
    { id: 'who-we-are', label: 'WHO WE ARE' },
    { id: 'offerings', label: 'OFFERINGS' },
    { id: 'thinking', label: 'THINKING' },
    { id: 'showcase', label: 'SHOWCASE' },
    { id: 'connect', label: 'CONNECT' }
  ];

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      
      if (!WEB3FORMS_ACCESS_KEY) {
        console.error('Access key:', WEB3FORMS_ACCESS_KEY); // Debug log
        throw new Error('Email service is not configured');
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          service: data.service,
          message: data.message,
          subject: 'New Contact Form Submission',
          redirect: false
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          reset();
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between content-padding py-6">
          <Link href="/" className="text-xl font-light">
            LOGO
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="navbar-link"
              >
                {link.label}
              </button>
            ))}
          </nav>
          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Mobile Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line my-1.5"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Modal */}
      <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="mobile-menu-content">
          {/* Close button */}
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 close-menu-btn text-white text-3xl">&times;</button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="navbar-link"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`unified-button no-default-border ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="button-content">
            <ChevronUp className="button-icon" />
        </span>
      </button>

      {/* Hero Section */}
      <main className="relative pt-24 section-padding">
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
          <h1 className="max-w-3xl text-4xl md:text-7xl font-light leading-tight tracking-tight">
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
                className="unified-button primary full-width rounded-lg no-default-border"
              >
                <span className="button-content">DISCUSS YOUR PROJECT</span>
              </Button>
              <p className="mt-6 md:mt-8 text-base leading-relaxed text-gray-400">
                PIONEERING SECURE SOLUTIONS FOR
                <br />
                THE DIGITAL FUTURE.
              </p>
            </div>

            <div className="scroll-indicator">
              <span className="text-sm md:text-base">SCROLL TO EXPLORE</span>
              <span className="h-px bg-white w-12"></span>
            </div>
          </div>

          <p className="mt-24 max-w-xl text-base leading-relaxed text-gray-400">
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
      <section id="who-we-are" className="relative py-32 section-padding">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mobile-heading font-light mb-8 text-white">WHO WE ARE</h2>
              <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mb-8"></div>
              <p className="mobile-text leading-relaxed text-gray-300 mb-6">
                Kodex Studio is where security meets innovation. We're a collective of visionary engineers, security
                architects, and creative technologists who believe that the most powerful solutions are born from the
                intersection of protection and possibility.
              </p>
              <p className="mobile-text text-gray-400 leading-relaxed">
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
      <section id="offerings" className="py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="mobile-heading md:text-5xl font-light mb-16 text-center text-white">OUR EXPERTISE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="unified-card mobile-card rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 group-hover:from-mint-400 group-hover:via-mist-400 group-hover:to-sage-400 transition-all duration-300">FUTURE-PROOF SOFTWARE</h3>
                <p className="mobile-text text-base text-gray-400 mb-6">
                  We craft intelligent, secure applications that evolve with your business. Our development philosophy
                  combines cutting-edge technology with battle-tested security principles.
                </p>
                <ul className="text-base text-gray-400 space-y-2">
                  <li>• Next-Gen Web & Mobile Apps</li>
                  <li>• Secure API Ecosystems</li>
                  <li>• Cloud-Native Architecture</li>
                  <li>• AI-Enhanced Solutions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="unified-card mobile-card rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 group-hover:from-mint-400 group-hover:via-mist-400 group-hover:to-sage-400 transition-all duration-300">SECURITY INTELLIGENCE</h3>
                <p className="mobile-text text-base text-gray-400 mb-6">
                  Our security experts don't just find vulnerabilities—we architect comprehensive defense strategies
                  that anticipate and neutralize emerging threats.
                </p>
                <ul className="text-base text-gray-400 space-y-2">
                  <li>• Advanced Threat Assessment</li>
                  <li>• Zero-Trust Implementation</li>
                  <li>• Compliance & Governance</li>
                  <li>• Security Culture Development</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="unified-card mobile-card rounded-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 group-hover:from-mint-400 group-hover:via-mist-400 group-hover:to-sage-400 transition-all duration-300">DIGITAL TRANSFORMATION</h3>
                <p className="mobile-text text-base text-gray-400 mb-6">
                  Complete ecosystem transformation that doesn't just digitize—it revolutionizes. We reimagine business
                  processes through the lens of security and innovation.
                </p>
                <ul className="text-base text-gray-400 space-y-2">
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
      <section id="thinking" className="py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="mobile-heading md:text-5xl font-light mb-16 text-white">THINKING</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="mobile-card unified-card h-full rounded-lg group">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <span className="text-base text-gray-400 mb-2 block">{post.category}</span>
                    <h3 className="text-xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 group-hover:from-mint-400 group-hover:via-mist-400 group-hover:to-sage-400 transition-all duration-300">{post.title}</h3>
                    <p className="mobile-text text-base text-gray-400 mb-4">{post.excerpt}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between text-base text-gray-400 mb-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Button
                      className="unified-button full-width rounded-lg no-default-border w-full"
                    >
                      <span className="button-content">READ MORE</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-32 section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="mobile-heading md:text-5xl font-light mb-16 text-center text-white">PROJECT SHOWCASE</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="unified-card mobile-card h-full group rounded-lg"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="aspect-video bg-gray-800 overflow-hidden rounded-lg mb-6">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="showcase-title text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400 group-hover:from-mint-400 group-hover:via-mist-400 group-hover:to-sage-400 transition-all duration-300">{project.title}</h3>
                    <p className="showcase-desc">{project.description}</p>
                  </div>
                  <div className="mt-auto flex flex-row gap-4">
                    <Button className="unified-button showcase-button no-default-border w-full">
                      <span className="button-content">
                        <ExternalLink className="button-icon" />
                        LIVE DEMO
                      </span>
                    </Button>
                    <Button className="unified-button showcase-button no-default-border w-full">
                      <span className="button-content">
                        <ArrowRight className="button-icon" />
                        CASE STUDY
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="connect" className="py-32 section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mobile-heading md:text-5xl font-light mb-8 text-white">LET'S CONNECT</h2>
            <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mx-auto mb-8"></div>
            <p className="mobile-text text-base text-gray-400 text-base">
              Ready to build something secure and extraordinary? Tell us about your project.
            </p>
          </div>

          {/* Contact Options */}
          <div className="flex justify-center space-x-8 mb-12">
            <a 
              href="mailto:kodexstudio@gmail.com"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <Mail className="w-5 h-5 group-hover:text-mint-400 transition-colors" />
              <span>Email Us</span>
            </a>
            <a 
              href="https://calendly.com/nessakodo/kodex-studio-information-call?month=2025-05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <Calendar className="w-5 h-5 group-hover:text-mint-400 transition-colors" />
              <span>Schedule a Call</span>
            </a>
          </div>

          <div className="backdrop-blur-md bg-black/30 rounded-lg border border-white/10">
            <div className="p-8 md:p-12">
              <form 
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="form-field-hover bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-mint-400/50 focus:ring-mint-400/20 transition-all duration-300"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                  
                  <Input
                    type="email"
                    placeholder="Email"
                    className="form-field-hover bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-mint-400/50 focus:ring-mint-400/20 transition-all duration-300"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                  
                  <Select
                    onValueChange={(value) => setValue("service", value)}
                    {...register("service")}
                  >
                    <SelectTrigger className="form-field-hover bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-mint-400/50 focus:ring-mint-400/20 transition-all duration-300">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-md border-white/10">
                      <SelectItem value="web" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Web Development</SelectItem>
                      <SelectItem value="mobile" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Mobile Development</SelectItem>
                      <SelectItem value="design" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">UI/UX Design</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-400 text-sm">{errors.service.message}</p>
                  )}
                  
                  <Textarea
                    placeholder="Message"
                    className="form-field-hover bg-black/50 border-white/10 text-white placeholder:text-gray-500 focus:border-mint-400/50 focus:ring-mint-400/20 transition-all duration-300 min-h-[150px]"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm">{errors.message.message}</p>
                  )}
                </div>
                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  className="unified-button primary no-default-border"
                  disabled={isSubmitting}
                  data-loading={isSubmitting}
                  data-success={isSuccess}
                >
                  <div className="button-content">
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner" />
                        <span>Sending...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <svg className="success-icon" viewBox="0 0 24 24">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <svg className="button-icon" viewBox="0 0 24 24">
                          <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor"/>
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 content-padding border-t border-white/10 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <div className="flex space-x-2 mr-4">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">© 2024 Kodex Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
