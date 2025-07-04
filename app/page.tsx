"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dynamic from 'next/dynamic'
import { ExternalLink, ArrowRight, ChevronUp, Mail, Calendar, Search, Github, Linkedin, Twitter, Youtube, Instagram, BookText } from "lucide-react"
import { cn } from "@/lib/utils"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

// Custom Components
import ThinkingUniverse from "./components/ThinkingUniverse"
import BlogPagination from "./components/BlogPagination"
import ExpertiseCard from "@/components/ExpertiseCard"
import SpotlightOverlay from "../components/SpotlightOverlay"
import EtherealSoftwareIcon from "@/components/EtherealSoftwareIcon"
import EtherealSecurityIcon from "@/components/EtherealSecurityIcon"
import EtherealTransformationIcon from "@/components/EtherealTransformationIcon"
import FloatingMasonryGrid from "./components/FloatingMasonryGrid"
import ShowcaseInteractiveBackground from "./components/ShowcaseInteractiveBackground"
import AstralProjectBelt from "./components/AstralProjectBelt"
import BinarySineWaveCarousel from "./components/BinarySineWaveCarousel"
import ProjectArcade from "./components/ProjectArcade"
import ProjectPlayer from "./components/ProjectPlayer"

// Types
import { FormData, formSchema, ExpertisePillar, Project } from "./types"

// Styles
import "./styles/binary-sine-wave.css"

// Config
import { EMAILJS_CONFIG } from './config/emailjs'
import emailjs from '@emailjs/browser'

// Constants
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
const POSTS_PER_PAGE = 3;

// Add these animation variants at the top of the file after imports
const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.2
    }
  }
};

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

// Add this before the Page component
const projects: Project[] = [
  {
    id: "guardian-drone",
    title: "GUARDIAN AI SECURITY DRONE",
    summary: "Autonomous security drone with TinyML person detection, AES-256 encrypted LoRa telemetry, and GPS waypoint navigation. Built with ESP32-CAM and Arduino for real-time threat detection.",
    description: "An advanced security drone system that combines TinyML for real-time person detection with secure AES-256 encrypted LoRa communication. Features GPS waypoint navigation and autonomous operation for enhanced security monitoring.",
    preview: "/images/guardian-thumb.gif",
    category: "security",
    techStack: ["ESP32-CAM", "Arduino", "TinyML", "LoRa", "AES-256", "GPS"],
    liveUrl: "https://youtube.com/demo",
    repoUrl: "https://github.com/nessakodo/guardian-drone",
    caseStudyUrl: "/guardian-drone-case"
  },
  {
    id: "phishkiller",
    title: "PHISHKILLER",
    summary: "Advanced phishing detection tool using machine learning and NLP to identify and neutralize sophisticated phishing attempts in real-time.",
    description: "A comprehensive phishing detection system that leverages machine learning and natural language processing to analyze email content, URLs, and behavioral patterns. Features include real-time threat assessment and detailed forensic analysis.",
    preview: "/images/phishkiller-thumb.png",
    category: "security",
    techStack: ["Python", "Scikit-learn", "Regex", "TF-IDF", "NLP"],
    liveUrl: "/phishkiller-demo",
    repoUrl: "https://github.com/nessakodo/phishkiller",
    caseStudyUrl: "/phishkiller-case"
  },
  {
    id: "anomaly-detection",
    title: "ANOMALY DETECTION LAB",
    summary: "Research-grade machine learning system combining XGBoost and Autoencoder architectures for advanced threat detection and pattern recognition.",
    description: "A sophisticated anomaly detection system that combines XGBoost and Autoencoder architectures to identify unusual patterns and potential security threats. Features comprehensive model evaluation and real-time monitoring capabilities.",
    preview: "/images/anomaly-thumb.png",
    category: "ai",
    techStack: ["XGBoost", "Autoencoder", "Keras", "pandas", "TensorFlow"],
    liveUrl: "/anomaly-demo",
    repoUrl: "https://github.com/nessakodo/anomaly-detection",
    caseStudyUrl: "/anomaly-case"
  },
  {
    id: "digital-sanctuary",
    title: "DIGITAL SANCTUARY",
    summary: "Secure web-based password manager with journaling elements, built with modern encryption and ethical design principles.",
    description: "A privacy-focused password manager that combines secure encryption with intuitive UX design. Features include secure password generation, encrypted storage, and integrated journaling capabilities.",
    preview: "/images/sanctuary-thumb.png",
    category: "security",
    techStack: ["React", "Node.js", "bcrypt", "TailwindCSS", "MongoDB"],
    liveUrl: "/sanctuary-demo",
    repoUrl: "https://github.com/nessakodo/digital-sanctuary",
    caseStudyUrl: "/sanctuary-case"
  },
  {
    id: "caresense",
    title: "CARESENSE",
    summary: "AI-powered healthcare triage system using natural language processing for intelligent patient assessment and care routing.",
    description: "An innovative healthcare triage system that uses AI and natural language processing to assess patient symptoms and provide initial medical guidance while maintaining strict privacy standards.",
    preview: "/images/caresense-thumb.png",
    category: "ai",
    techStack: ["Python", "Scikit-learn", "Flask", "Twilio", "NLP"],
    liveUrl: "/caresense-demo",
    repoUrl: "https://github.com/nessakodo/caresense",
    caseStudyUrl: "/caresense-case"
  }
];

const DynamicConnectSection = dynamic(() => import('./components/ConnectSection'), { ssr: false });

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
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);

  const expertiseSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);
  const thinkingRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Update the sectionRefs definition with proper typing
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    whoWeAre: useRef<HTMLElement>(null),
    offerings: useRef<HTMLElement>(null),
    thinking: useRef<HTMLElement>(null),
    showcase: useRef<HTMLElement>(null),
    connect: useRef<HTMLElement>(null)
  };

  // Update the useSectionVisibility hook to handle null refs
  const useSectionVisibility = (ref: React.RefObject<HTMLElement | null>) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);

    return isVisible;
  };

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

  const navLinks = [
    { id: 'who-we-are', label: 'WHO WE ARE' },
    { id: 'offerings', label: 'OFFERINGS' },
    { id: 'thinking', label: 'THINKING' },
    { id: 'showcase', label: 'SHOWCASE' },
    { id: 'connect', label: 'CONNECT' }
  ];

  // Section Header Component for consistent styling and parallax
  const SectionHeader = ({ title, subtitle, scrollYProgress, marginBottomClass = "mb-16" }: { title: string; subtitle: string; scrollYProgress?: any; marginBottomClass?: string }) => {
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

    return (
      <motion.div
        className={`max-w-6xl mx-auto text-center ${marginBottomClass}`}
        style={{ opacity: headerOpacity, y: headerY }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-light mb-8 text-white"
        >
          {title}
        </motion.h2>
        <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mx-auto mb-8"></div>
        <motion.p 
          className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    );
  };

  // Scroll progress for each section
  const { scrollYProgress: heroScrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const { scrollYProgress: whoWeAreScrollYProgress } = useScroll({ target: whoWeAreRef, offset: ["start end", "end start"] });
  const { scrollYProgress: offeringsScrollYProgress } = useScroll({ target: offeringsRef, offset: ["start end", "end start"] });
  const { scrollYProgress: thinkingScrollYProgress } = useScroll({ target: thinkingRef, offset: ["start end", "end start"] });
  const { scrollYProgress: showcaseScrollYProgress } = useScroll({ target: showcaseRef, offset: ["start end", "end start"] });
  const { scrollYProgress: connectScrollYProgress } = useScroll({ target: connectRef, offset: ["start end", "end start"] });
  const { scrollYProgress: footerScrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end start"] });

  // Content animations (opacity and Y-position based on scroll)
  const heroContentOpacity = useTransform(heroScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const heroContentY = useTransform(heroScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const whoWeAreContentOpacity = useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const whoWeAreContentY = useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const offeringsContentOpacity = useTransform(offeringsScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const offeringsContentY = useTransform(offeringsScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const thinkingContentOpacity = useTransform(thinkingScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const thinkingContentY = useTransform(thinkingScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const showcaseContentOpacity = useTransform(showcaseScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const showcaseContentY = useTransform(showcaseScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const connectContentOpacity = useTransform(connectScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const connectContentY = useTransform(connectScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  const footerContentOpacity = useTransform(footerScrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const footerContentY = useTransform(footerScrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 z-50 w-full navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between content-padding py-4 md:py-6">
          <Link href="/" className="text-xl font-light">
            <img src='assets/logo.png' alt="Kodex Studio" className="h-7 md:h-8" />
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="navbar-link text-sm font-medium hover:text-mint-400 transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>
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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'hidden'} fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 transition-opacity duration-300`}>
        <div className="mobile-menu-content relative w-full h-full flex flex-col items-center justify-center p-8">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 close-menu-btn text-white text-4xl leading-none">&times;</button>
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

      {/* Gradient overlay */}
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
        <motion.main 
          ref={sectionRefs.hero}
          className="relative py-32 md:py-48 section-padding"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.hero) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.div 
            className="relative min-h-[80vh] flex flex-col justify-center"
            style={{ opacity: heroContentOpacity, y: heroContentY }}
          >
            <motion.h1 
              className="max-w-3xl text-4xl md:text-7xl font-light leading-tight tracking-tight mb-6 md:mb-8"
            >
              KODEX STUDIO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-400 via-mist-400 to-mint-400">
                SECURE DIGITAL
              </span>
              <br />
              INNOVATION.
            </motion.h1>
            <motion.div 
              className="h-px w-20 md:w-24 bg-gradient-to-r from-mist-400 to-mint-400 mb-6 md:mb-8"
              style={{ x: useTransform(heroScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, 50]), width: useTransform(heroScrollYProgress, [0, 0.15], [0, 96]) }}
            />
            <motion.p 
              className="text-base md:text-xl text-gray-400 leading-relaxed max-w-2xl mb-6 md:mb-8"
            >
              PIONEERING SECURE SOLUTIONS FOR THE DIGITAL FUTURE.
            </motion.p>
            <motion.p 
              className="text-sm md:text-lg leading-relaxed text-gray-400 max-w-xl mb-8 md:mb-12"
            >
              At Kodex Studio, we architect the future of digital security. Our innovative solutions blend cutting-edge
              technology with uncompromising protection, creating systems that don't just meet today's needs—they
              anticipate tomorrow's challenges.
            </motion.p>

            <motion.div 
              className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end space-y-6 md:space-y-0"
            >
              <div className="max-w-md w-full md:w-auto">
                <Button
                  className="unified-button primary full-width rounded-lg backdrop-blur-md bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/40"
                  onClick={() => scrollToSection('connect')}
                >
                  <span className="button-content">DISCUSS YOUR PROJECT</span>
                </Button>
              </div>

              {/* Scroll indicator */}
              <div className="scroll-indicator text-center md:text-left">
                <span className="text-xs md:text-sm">SCROLL TO EXPLORE</span>
                <span className="h-px bg-white w-10 md:w-12 block mx-auto md:mx-0 mt-2"></span>
              </div>
            </motion.div>
          </motion.div>
        </motion.main>

        {/* Who We Are Section */}
        <motion.section 
          ref={sectionRefs.whoWeAre}
          id="who-we-are" 
          className="relative py-32 md:py-48 section-padding text-center"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.whoWeAre) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="WHO WE ARE"
            subtitle="Kodex Studio is where security meets innovation. We're a collective of visionary engineers, security architects, and creative technologists who believe that the most powerful solutions are born from the intersection of protection and possibility."
            scrollYProgress={whoWeAreScrollYProgress}
          />
          <motion.div 
            className="relative max-w-6xl mx-auto"
            style={{ opacity: whoWeAreContentOpacity, y: whoWeAreContentY }}
          >
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center text-left">
              <motion.div
                style={{ x: useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, -50]) }}
              >
                <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-6 md:mb-8">
                  Our mission is simple yet profound: to build digital ecosystems that are not only secure and scalable
                  but also beautifully crafted and future-ready. Every line of code we write, every system we design, is a
                  step toward a more secure digital tomorrow.
                </p>
              </motion.div>
              <motion.div 
                className="relative aspect-square flex items-center justify-center p-8"
                style={{ x: useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, 50]) }}
              >
                <div className="aspect-square w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full bg-gradient-to-br from-sage-600/30 to-mist-600/30 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-light mb-1 md:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-mist-400 to-mint-400">
                      100+
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">SECURE SOLUTIONS DELIVERED</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Offerings Section */}
        <motion.section 
          ref={sectionRefs.offerings}
          id="offerings" 
          className="py-48 section-padding relative text-center"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.offerings) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="OUR EXPERTISE"
            subtitle="We blend cutting-edge technology with battle-tested security principles to deliver solutions that are engineered for the horizon."
            scrollYProgress={offeringsScrollYProgress}
          />
          <motion.div 
            className="max-w-6xl mx-auto relative z-10"
            style={{ opacity: offeringsContentOpacity, y: offeringsContentY }}
          >
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Spotlight Overlay */}
              <SpotlightOverlay containerRef={expertiseSectionRef} hoveredExpertiseIndex={hoveredExpertiseIndex} />

              {/* Ethereal Pillars Display Container */}
              <div ref={expertiseSectionRef} className="col-span-3 grid md:grid-cols-3 gap-6 md:gap-8 relative z-10 h-auto md:h-[650px] items-start px-4 pt-12 md:pt-16 text-mint-400">
                {expertiseData.map((pillar, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "relative h-full flex flex-col items-center p-6 md:p-8 text-center cursor-pointer transition-all duration-300 ease-out",
                      hoveredExpertiseIndex === index ? "opacity-100" : "opacity-70",
                      "group expertise-card-item focus:outline-none",
                      "hover:scale-[1.01]",
                    )}
                    onMouseEnter={() => setHoveredExpertiseIndex(index)}
                    onMouseLeave={() => setHoveredExpertiseIndex(null)}
                    tabIndex={0}
                    style={{ x: useTransform(offeringsScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, (index % 2 === 0 ? -50 : 50)]) }}
                  >
                    {/* Core Visual Element (Ethereal Icon/Symbol) & Title - Always Visible */}
                    <div className="flex flex-col items-center relative z-20 mb-4 md:mb-6">
                      <motion.div
                        className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-2 md:mb-4 max-h-32"
                        animate={{
                          scale: hoveredExpertiseIndex === index ? 1.1 : 1,
                          opacity: hoveredExpertiseIndex === index ? 1 : 0.9
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {pillar.title === "FUTURE-PROOF SOFTWARE" && <EtherealSoftwareIcon isActive={hoveredExpertiseIndex === index} className="w-full h-full" />}
                        {pillar.title === "SECURITY INTELLIGENCE" && <EtherealSecurityIcon isActive={hoveredExpertiseIndex === index} className="w-full h-full" />}
                        {pillar.title === "DIGITAL TRANSFORMATION" && <EtherealTransformationIcon isActive={hoveredExpertiseIndex === index} className="w-full h-full" />}
                      </motion.div>
                      <h3 className="text-xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-mist-400 to-mint-400 group-hover:to-sage-400 transition-all duration-300">
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Microcopy and Description Container - Appears on Hover */}
                    <motion.div
                      className="px-2 md:px-4 text-center z-10 overflow-hidden"
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={hoveredExpertiseIndex === index ? { opacity: 1, height: 'auto', y: 0, padding: '0 0.5rem' } : { opacity: 0, height: 0, y: 10, padding: '0 0.5rem' }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Microcopy */}
                      <motion.span
                        className="inline-block mb-2 md:mb-3 text-sm md:text-base text-mint-400 leading-relaxed"
                        initial={{ opacity: 0, y: 5 }}
                        animate={hoveredExpertiseIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                        transition={{ duration: 0.4, delay: hoveredExpertiseIndex === index ? 0.1 : 0, ease: "easeOut" }}
                      >
                        {pillar.microcopy}
                      </motion.span>
                      {/* Description */}
                      <motion.p
                        className="text-sm md:text-base text-gray-300 leading-relaxed"
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
          </motion.div>
        </motion.section>

        {/* Thinking Section */}
        <motion.section 
          ref={sectionRefs.thinking}
          id="thinking" 
          className="relative py-32 md:py-48 section-padding text-center"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.thinking) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="THINKING"
            subtitle="Insights and analyses from the forefront of digital security and innovation. Stay informed with our latest articles."
            scrollYProgress={thinkingScrollYProgress}
          />
          <motion.div 
            className="relative max-w-6xl mx-auto"
            style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
          >
            {loadingPosts && <p className="text-center text-gray-400">Loading posts...</p>}
            {postsError && <p className="text-center text-red-400">Error loading posts: {postsError}</p>}
            {!loadingPosts && !postsError && filteredPosts.length > 0 && (
              <>
                {/* Search Bar */}
                <motion.div 
                  className="mb-8 px-4"
                  style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
                >
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-mint-400 transition-colors z-10" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 md:py-4 bg-black/20 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 placeholder:text-gray-400 focus:border-mint-400/30 focus:ring-1 focus:ring-mint-400/20 transition-all duration-300 hover:border-white/10 focus:bg-black/20 hover:bg-black/20"
                    />
                  </div>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
                  {getCurrentPosts().map((post: any) => (
                    <motion.div
                      key={post.id}
                      style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
                    >
                      <Card className="mobile-card unified-card h-auto md:h-[420px] rounded-lg group backdrop-blur-md bg-black/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                        <CardContent className="p-6 md:p-8 flex flex-col h-full text-left">
                          <div className="flex-1 min-h-0">
                            {post.tag_list && post.tag_list.length > 0 && (
                              <span className="thinking-category text-xs md:text-sm">{post.tag_list[0]}</span>
                            )}
                            <h3 className="text-lg md:text-xl font-light mb-3 text-white group-hover:text-white/90 transition-all duration-300 line-clamp-2">{post.title}</h3>
                            <p className="text-sm md:text-base text-gray-300 mb-3 line-clamp-3">{post.description}</p>
                          </div>
                          <div className="mt-auto">
                            <div className="flex justify-between text-xs md:text-base text-gray-400 mb-3">
                              <span>{new Date(post.published_timestamp).toLocaleDateString()}</span>
                              <span>{post.reading_time_minutes} min read</span>
                            </div>
                            <Link href={post.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                              <Button
                                className="unified-button full-width rounded-lg backdrop-blur-sm bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300"
                              >
                                <span className="button-content text-sm">READ ARTICLE</span>
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <motion.div 
                  className="mt-10 md:mt-12 px-4"
                  style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
                >
                  <BlogPagination
                    totalPosts={filteredPosts.length}
                    postsPerPage={POSTS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onSearch={handleSearch}
                    hideSearch={true}
                  />
                </motion.div>
              </>
            )}
            {!loadingPosts && !postsError && filteredPosts.length === 0 && (
              <motion.p
                className="text-center text-gray-400 text-base md:text-lg"
                style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
              >
                No blog posts found.
              </motion.p>
            )}
          </motion.div>
        </motion.section>

        {/* Showcase Section */}
        <motion.section 
          ref={sectionRefs.showcase}
          id="showcase" 
          className="relative py-48"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.showcase) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="PROJECT SHOWCASE"
            subtitle="Explore Kodex Studio's signature projects. Each solution comes alive—see it in motion, understand its impact, and dive deeper with live demos or code."
            scrollYProgress={showcaseScrollYProgress}
          />
          <motion.div 
            className="relative z-10"
            style={{ opacity: showcaseContentOpacity, y: showcaseContentY }}
          >
            <ProjectPlayer projects={projects} />
          </motion.div>
        </motion.section>

        {/* Connect Section */}
        <motion.section 
          ref={sectionRefs.connect}
          id="connect"
          className="relative py-32 md:py-48 section-padding"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.connect) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="CONNECT"
            subtitle="Ready to transform your digital landscape? Let's discuss how we can help secure and elevate your vision."
            scrollYProgress={connectScrollYProgress}
            marginBottomClass="mb-8 md:mb-16"
          />
          <motion.div 
            className="relative z-10 px-4"
            style={{ opacity: connectContentOpacity, y: connectContentY }}
          >
            <DynamicConnectSection />
          </motion.div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="py-16 md:py-32 content-padding border-t border-white/10 mt-auto relative z-10"
      >
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0"
          style={{ opacity: footerContentOpacity, y: footerContentY }}
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 md:mb-0">
            <a
              href="https://github.com/nessakodo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/nessamadison"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://dev.to/nessakodo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-110"
              aria-label="Dev.to"
            >
              <BookText className="w-5 h-5 text-white" />
            </a>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-sm text-gray-400">© 2025 Kodex Studio. All rights reserved.</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
