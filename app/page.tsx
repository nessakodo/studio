"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { ExternalLink, ArrowRight, ChevronUp, Mail, Calendar, Search } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config/emailjs';
import ThinkingUniverse from "./components/ThinkingUniverse"
import BlogPagination from "./components/BlogPagination"
import ExpertiseCard from "@/components/ExpertiseCard";
import SpotlightOverlay from "../components/SpotlightOverlay"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import EtherealSoftwareIcon from "@/components/EtherealSoftwareIcon";
import EtherealSecurityIcon from "@/components/EtherealSecurityIcon";
import EtherealTransformationIcon from "@/components/EtherealTransformationIcon";

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

// Define posts per page for the thinking section
const POSTS_PER_PAGE = 3;

// Sample SVG Animation Component (Shield) - Enhanced
const ShieldAnimation = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-24 w-24 text-mint-400 drop-shadow-[0_0_5px_rgba(108,200,170,0.5)]"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {/* Base Shield Outline - Drawn first */}
    <motion.path 
      d="M10 30 Q 10 10, 30 10 L 70 10 Q 90 10, 90 30 L 90 70 Q 90 90, 70 90 L 30 90 Q 10 90, 10 70 L 10 30 Z"
      initial={{ pathLength: 0, opacity: 0.5 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      stroke="rgba(108,200,170,0.8)"
      strokeWidth="3"
    />

    {/* Inner Security Layers - Appear with delay */}
    <motion.path
      d="M25 40 L 50 25 L 75 40 L 75 60 L 50 75 L 25 60 Z"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      stroke="rgba(108,200,170,0.6)"
      fill="rgba(108,200,170,0.1)"
    />
    <motion.path
      d="M35 50 L 50 41 L 65 50 L 65 50 L 50 59 L 35 50 Z"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      stroke="rgba(108,200,170,0.6)"
      fill="rgba(108,200,170,0.1)"
    />

    {/* Central Lock Icon - Appears last */}
    <motion.circle cx="50" cy="50" r="8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      stroke="rgba(108,200,170,0.9)"
      strokeWidth="2"
      fill="rgba(108,200,170,0.2)"
    />
     <motion.path d="M50 42 L 50 35"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.3, ease: "easeOut" }}
      stroke="rgba(108,200,170,0.9)"
      strokeWidth="2"
    />

  </motion.svg>
);

// Sample Code Animation Placeholder - Moved from ExpertiseCard
const CodeAnimation = () => (
  <div className="text-sm font-mono text-sage-400">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {`const secureFunction = (data) => {`}
    </motion.p>
     <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {`  // Validate and sanitize`}
    </motion.p>
     <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {`  return processedData;`}
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {`};`}
    </motion.p>
  </div>
);

// Sample Nodes Animation Placeholder - Moved from ExpertiseCard
const NodesAnimation = () => (
   <div className="w-full h-full relative">
     <motion.div
       className="absolute inset-0 flex items-center justify-center"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.5 }}
     >
       {/* Replace with actual node/line SVG or Canvas animation */}
       <div className="w-16 h-16 rounded-full bg-mist-400/30 animate-pulse"></div>
     </motion.div>
  </div>
);

// Define type for Expertise Pillar data
interface ExpertisePillar {
  title: string;
  description: string;
  microcopy: string;
}

// Define data for Expertise section
const expertiseData: ExpertisePillar[] = [
  {
    title: "FUTURE-PROOF SOFTWARE",
    description: "We craft intelligent, secure applications that evolve with your business. Our development philosophy combines cutting-edge technology with battle-tested security principles.",
    microcopy: "Intelligent Code. Adaptive Security. Engineered for the Horizon.",
  },
  {
    title: "SECURITY INTELLIGENCE",
    description: "Our security experts don't just find vulnerabilities—we architect comprehensive defense strategies that anticipate and neutralize emerging threats.",
    microcopy: "Proactive Defense. Engineered Resilience. Anticipate and Neutralize.",
  },
  {
    title: "DIGITAL TRANSFORMATION",
    description: "Complete ecosystem transformation that doesn't just digitize—it revolutionizes. We reimagine business processes through the lens of security and innovation.",
    microcopy: "Strategic Evolution. Seamless Integration. Revolutionizing Digital Ecosystems.",
  },
];

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredExpertiseIndex, setHoveredExpertiseIndex] = useState<number | null>(null);

  const expertiseSectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingPosts(true);
        const response = await fetch(`https://dev.to/api/articles?username=nessakodo&per_page=100`);
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        const filteredData = data.filter((post: any) => post.cover_image !== null);
        setBlogPosts(filteredData);
        setFilteredPosts(filteredData);
        setTotalPages(Math.ceil(filteredData.length / POSTS_PER_PAGE));
        setHasMorePosts(currentPage < Math.ceil(filteredData.length / POSTS_PER_PAGE));
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setPostsError(err instanceof Error ? err.message : 'An unexpected error occurred while fetching posts.');
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = blogPosts.filter((post: any) => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / POSTS_PER_PAGE));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get current posts
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  };

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
            <img src="/assets/logo.png" alt="Kodex Studio Logo" className="h-8" />
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

      {/* Scroll to Top Button - Initially hidden */}
      <button 
        className={`unified-button no-default-border ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="button-content">
            <ChevronUp className="button-icon" />
        </span>
      </button>

      {/* Gradient overlay that flows through sections */}
      <div className="fixed inset-0 pointer-events-none z-0">
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
      </div>

      {/* Thinking Universe Background */}
      <div className="fixed inset-0 z-0">
        <ThinkingUniverse />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <main className="relative pt-24 section-padding">
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
                  className="unified-button primary full-width rounded-lg backdrop-blur-md bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/40"
                  onClick={() => scrollToSection('connect')}
                >
                  <span className="button-content">DISCUSS YOUR PROJECT</span>
                </Button>
                <p className="mt-6 md:mt-8 text-base leading-relaxed text-gray-400">
                  PIONEERING SECURE SOLUTIONS FOR
                  <br />
                  THE DIGITAL FUTURE.
                </p>
              </div>

              {/* Moved scroll indicator here */}
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

        {/* Who We Are Section */}
        <section id="who-we-are" className="relative py-48 section-padding">
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
        <section id="offerings" className="py-48 section-padding relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="mobile-heading md:text-5xl font-light mb-16 text-center text-white">OUR EXPERTISE</h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Spotlight Overlay */}
              <SpotlightOverlay containerRef={expertiseSectionRef} hoveredExpertiseIndex={hoveredExpertiseIndex} />

              {/* Ethereal Pillars Display Container */}
              <div ref={expertiseSectionRef} className="col-span-3 grid md:grid-cols-3 gap-8 relative z-10 h-[650px] items-start px-4 pt-16">
                {expertiseData.map((pillar, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "relative h-full flex flex-col items-center p-4 text-center cursor-pointer transition-all duration-300 ease-out",
                      hoveredExpertiseIndex === index ? "opacity-100" : "opacity-70",
                      "group expertise-card-item focus:outline-none focus:ring-2 focus:ring-mint-400/50",
                      "hover:scale-[1.01]",
                    )}
                    onMouseEnter={() => setHoveredExpertiseIndex(index)}
                    onMouseLeave={() => setHoveredExpertiseIndex(null)}
                    tabIndex={0}
                  >
                     {/* Core Visual Element (Ethereal Icon/Symbol) & Title - Always Visible */}
                    <div className="flex flex-col items-center relative z-20 mb-6">
                        <motion.div
                            className="w-32 h-32 flex items-center justify-center mb-4"
                            animate={{ 
                              scale: hoveredExpertiseIndex === index ? 1.1 : 1,
                              opacity: hoveredExpertiseIndex === index ? 1 : 0.9
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                             {pillar.title === "FUTURE-PROOF SOFTWARE" && <EtherealSoftwareIcon isActive={hoveredExpertiseIndex === index} />}
                             {pillar.title === "SECURITY INTELLIGENCE" && <EtherealSecurityIcon isActive={hoveredExpertiseIndex === index} />}
                             {pillar.title === "DIGITAL TRANSFORMATION" && <EtherealTransformationIcon isActive={hoveredExpertiseIndex === index} />}
                        </motion.div>
                        <h3 className="text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-mist-400 to-mint-400 group-hover:to-sage-400 transition-all duration-300">
                          {pillar.title}
                        </h3>
                    </div>

                     {/* Microcopy and Description Container - Appears on Hover */}
                     <motion.div
                       className="px-4 text-center z-10 overflow-hidden"
                       initial={{ opacity: 0, height: 0, y: 10 }}
                       animate={hoveredExpertiseIndex === index ? { opacity: 1, height: 'auto', y: 0, padding: '0 1rem' } : { opacity: 0, height: 0, y: 10, padding: '0 1rem' }}
                       transition={{ duration: 0.5, ease: "easeOut" }}
                     >
                        {/* Microcopy */}
                       <motion.span
                         className="inline-block mb-3 text-sm text-mint-400 leading-relaxed"
                         initial={{ opacity: 0, y: 5 }}
                         animate={hoveredExpertiseIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                         transition={{ duration: 0.4, delay: hoveredExpertiseIndex === index ? 0.1 : 0, ease: "easeOut" }}
                       >
                         {pillar.microcopy}
                       </motion.span>
                        {/* Description */}
                       <motion.p
                         className="mobile-text text-base text-gray-300 leading-relaxed"
                         initial={{ opacity: 0, y: 5 }}
                         animate={hoveredExpertiseIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                         transition={{ duration: 0.4, delay: hoveredExpertiseIndex === index ? 0.2 : 0, ease: "easeOut" }}
                       >
                         {pillar.description}
                       </motion.p>
                     </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
           {/* Interactive Background Particles/Lines will go here */}
           {/* <AnimatedBackground /> */}
        </section>

        {/* Thinking Section */}
        <section id="thinking" className="relative py-48 section-padding">
          <div className="relative max-w-6xl mx-auto">
            <h2 className="mobile-heading md:text-5xl font-light mb-16 text-white text-center">THINKING</h2>
            {loadingPosts && <p className="text-center text-gray-400">Loading posts...</p>}
            {postsError && <p className="text-center text-red-400">Error loading posts: {postsError}</p>}
            {!loadingPosts && !postsError && filteredPosts.length > 0 && (
              <>
                {/* Search Bar */}
                <div className="mb-8">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-mint-400 transition-colors z-10" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-black/20 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 placeholder-gray-400 focus:border-mint-400/30 focus:ring-1 focus:ring-mint-400/20 transition-all duration-300 hover:border-white/10 focus:bg-black/20 hover:bg-black/20"
                    />
                  </div>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {getCurrentPosts().map((post: any) => (
                    <Card key={post.id} className="mobile-card unified-card h-[420px] rounded-lg group backdrop-blur-md bg-black/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="flex-1 min-h-0">
                          {post.tag_list && post.tag_list.length > 0 && (
                            <span className="thinking-category">{post.tag_list[0]}</span>
                          )}
                          <h3 className="text-xl font-light mb-4 text-white group-hover:text-white/90 transition-all duration-300 line-clamp-2">{post.title}</h3>
                          <p className="mobile-text text-base text-gray-300 mb-4 line-clamp-3">{post.description}</p>
                        </div>
                        <div className="mt-auto">
                          <div className="flex justify-between text-base text-gray-400 mb-4">
                            <span>{new Date(post.published_timestamp).toLocaleDateString()}</span>
                            <span>{post.reading_time_minutes} min read</span>
                          </div>
                          <Link href={post.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                            <Button
                              className="unified-button full-width rounded-lg backdrop-blur-sm bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300"
                            >
                              <span className="button-content">READ ARTICLE</span>
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-12">
                  <BlogPagination
                    totalPosts={filteredPosts.length}
                    postsPerPage={POSTS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onSearch={handleSearch}
                    hideSearch={true}
                  />
                  </div>
              </>
            )}
            {!loadingPosts && !postsError && filteredPosts.length === 0 && (
              <p className="text-center text-gray-400">No blog posts found.</p>
            )}
          </div>
        </section>

        {/* Showcase Section */}
        <section id="showcase" className="py-48 section-padding">
          <div className="max-w-6xl mx-auto">
            <h2 className="mobile-heading md:text-5xl font-light mb-16 text-center text-white">PROJECT SHOWCASE</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="unified-card mobile-card h-full group rounded-lg showcase-card-variant"
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
                      <Button className="unified-button showcase-button">
                        <span className="button-content">
                          LIVE DEMO
                        </span>
                      </Button>
                      <Button className="unified-button showcase-button">
                        <span className="button-content">
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
        <section id="connect" className="py-48 section-padding">
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
                  className="space-y-6 connect-form"
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
                    className="unified-button primary"
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
                        <span>Message Sent</span>
                      ) : (
                        <span>SEND MESSAGE</span>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 content-padding border-t border-white/10 mt-auto relative z-10">
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
