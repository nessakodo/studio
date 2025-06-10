"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dynamic from 'next/dynamic'
import { ExternalLink, ArrowRight, ChevronUp, Mail, Calendar, Search } from "lucide-react"
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
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
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
    id: "cryptiq",
    title: "Cryptiq Messenger",
    summary: "Encrypted chat platform using NIST-approved post-quantum cryptography",
    description: "A secure messaging platform that implements post-quantum cryptography algorithms to ensure future-proof encryption. Features include end-to-end encryption, secure file sharing, and real-time message delivery.",
    preview: "/assets/projects/cryptiq.png",
    category: "security" as const,
    techStack: ["Next.js", "TypeScript", "Kyber", "Dilithium", "WebRTC"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  },
  {
    id: "phishkiller",
    title: "PhishKiller Analyzer",
    summary: "CLI tool and dashboard for scanning and defending against phishing attacks",
    description: "An advanced phishing detection system that combines machine learning with traditional security analysis to identify and neutralize phishing attempts in real-time.",
    preview: "/assets/projects/phishkiller.png",
    category: "security" as const,
    techStack: ["Python", "React", "TensorFlow", "Docker"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  },
  {
    id: "caresense",
    title: "CareSense AI Triage",
    summary: "Natural language triage for digital health, built on ethical AI principles",
    description: "An AI-powered healthcare triage system that uses natural language processing to assess patient symptoms and provide initial medical guidance while maintaining strict privacy standards.",
    preview: "/assets/projects/caresense.png",
    category: "ai" as const,
    techStack: ["Python", "FastAPI", "React", "TensorFlow"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  },
  {
    id: "finvault",
    title: "FinVault Wallet Suite",
    summary: "Modern wallet with advanced encryption and real-time analytics",
    description: "A comprehensive financial management suite that combines secure cryptocurrency storage with traditional banking features, all protected by military-grade encryption.",
    preview: "/assets/projects/finvault.png",
    category: "security" as const,
    techStack: ["React", "TypeScript", "Web3.js", "Solidity"],
    liveUrl: "#",
    caseStudyUrl: "#"
  },
  {
    id: "smartcity",
    title: "SmartCity Viz Dashboard",
    summary: "Real-time smart city platform with role-based access and data visualization",
    description: "An interactive dashboard for monitoring and managing smart city infrastructure, featuring real-time data visualization and role-based access control.",
    preview: "/assets/projects/smartcity.png",
    category: "data" as const,
    techStack: ["React", "D3.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    caseStudyUrl: "#"
  },
  {
    id: "neuralart",
    title: "NeuralArt Studio",
    summary: "AI-powered creative suite for digital artists and designers",
    description: "A creative platform that leverages AI to assist artists in generating, editing, and enhancing digital artwork while maintaining artistic integrity.",
    preview: "/assets/projects/neuralart.png",
    category: "creative" as const,
    techStack: ["Python", "TensorFlow", "React", "WebGL"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  },
  {
    id: "pixelperfect",
    title: "PixelPerfect Design Studio",
    summary: "AI-driven platform for generating and refining digital art assets",
    description: "A creative suite that empowers designers with AI tools for rapid prototyping, style transfer, and intelligent asset generation, ensuring every pixel is perfect.",
    preview: "/assets/projects/pixelperfect.png",
    category: "creative" as const,
    techStack: ["Next.js", "Tailwind CSS", "DALL-E API", "Figma API"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  },
  {
    id: "datasphere",
    title: "DataSphere Analytics",
    summary: "Enterprise-grade data analysis and visualization platform",
    description: "A powerful data analytics platform that helps businesses make sense of complex datasets through intuitive visualizations and advanced analysis tools.",
    preview: "/assets/projects/datasphere.png",
    category: "data" as const,
    techStack: ["Python", "React", "D3.js", "PostgreSQL"],
    liveUrl: "#",
    caseStudyUrl: "#"
  },
  {
    id: "aisecurity",
    title: "AI Security Sentinel",
    summary: "AI-powered threat detection and response system",
    description: "An intelligent security system that uses machine learning to detect and respond to potential threats in real-time, providing comprehensive protection for digital assets.",
    preview: "/assets/projects/aisecurity.png",
    category: "ai" as const,
    techStack: ["Python", "TensorFlow", "React", "Docker"],
    liveUrl: "#",
    caseStudyUrl: "#",
    repoUrl: "#"
  }
];

const DynamicConnectSection = dynamic(() => import('./components/ConnectSection'), { ssr: false });

// Add this new component after the imports
const BinaryDivider = () => {
  const [binaryStream, setBinaryStream] = useState<string[]>([]);
  
  useEffect(() => {
    const generateBinary = () => {
      const length = 20;
      const stream = Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0');
      setBinaryStream(stream);
    };

    generateBinary();
    const interval = setInterval(generateBinary, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative h-px w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-mint-400/30 to-transparent" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center space-x-1 text-[8px] text-mint-400/50 font-mono"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {binaryStream.map((bit, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            {bit}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

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
        <div className="flex items-center justify-between content-padding py-6">
          <Link href="/" className="text-xl font-light">
            <img src='assets/logo.png' alt="Kodex Studio" className="h-8" />
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
      <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'}`}>
        <div className="mobile-menu-content">
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
          className="relative py-48 section-padding"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.hero) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.div 
            className="relative min-h-[80vh] flex flex-col justify-center"
            style={{ opacity: heroContentOpacity, y: heroContentY }}
          >
            <motion.h1 
              className="max-w-3xl text-5xl md:text-8xl font-light leading-tight tracking-tight mb-8"
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
              className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mb-8"
              style={{ x: useTransform(heroScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, 50]), width: useTransform(heroScrollYProgress, [0, 0.15], [0, 96]) }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mb-8"
            >
              PIONEERING SECURE SOLUTIONS FOR THE DIGITAL FUTURE.
            </motion.p>
            <motion.p 
              className="text-base md:text-lg leading-relaxed text-gray-400 max-w-xl"
            >
              At Kodex Studio, we architect the future of digital security. Our innovative solutions blend cutting-edge
              technology with uncompromising protection, creating systems that don't just meet today's needs—they
              anticipate tomorrow's challenges.
            </motion.p>

            <motion.div 
              className="mt-16 md:mt-24 flex flex-col md:flex-row justify-between items-start md:items-end space-y-8 md:space-y-0"
            >
              <div className="max-w-md">
                <Button
                  className="unified-button primary full-width rounded-lg backdrop-blur-md bg-black/30 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/40"
                  onClick={() => scrollToSection('connect')}
                >
                  <span className="button-content">DISCUSS YOUR PROJECT</span>
                </Button>
              </div>

              {/* Scroll indicator */}
              <div className="scroll-indicator">
                <span className="text-sm md:text-base">SCROLL TO EXPLORE</span>
                <span className="h-px bg-white w-12"></span>
              </div>
            </motion.div>
          </motion.div>
          <div className="mt-16">
            <BinaryDivider />
          </div>
        </motion.main>

        {/* Who We Are Section */}
        <motion.section 
          ref={sectionRefs.whoWeAre}
          id="who-we-are" 
          className="relative py-48 section-padding text-center"
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
            <div className="grid md:grid-cols-2 gap-16 items-center text-left">
              <motion.div
                style={{ x: useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, -50]) }}
              >
                <p className="mobile-text leading-relaxed text-gray-300 mb-6">
                  Our mission is simple yet profound: to build digital ecosystems that are not only secure and scalable
                  but also beautifully crafted and future-ready. Every line of code we write, every system we design, is a
                  step toward a more secure digital tomorrow.
                </p>
              </motion.div>
              <motion.div 
                className="relative"
                style={{ x: useTransform(whoWeAreScrollYProgress, [0, 0.15, 0.85, 1], [0, 0, 0, 50]) }}
              >
                <div className="aspect-square bg-gradient-to-br from-sage-600/30 to-mist-600/30 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-light mb-2 text-transparent bg-clip-text bg-gradient-to-r from-mist-400 to-mint-400">
                      100+
                    </div>
                    <div className="text-sm text-gray-400">SECURE SOLUTIONS DELIVERED</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="mt-16">
            <BinaryDivider />
          </div>
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
              <div ref={expertiseSectionRef} className="col-span-3 grid md:grid-cols-3 gap-8 relative z-10 h-[650px] items-start px-4 pt-16 text-mint-400">
                {expertiseData.map((pillar, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "relative h-full flex flex-col items-center p-4 text-center cursor-pointer transition-all duration-300 ease-out",
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
                    <div className="flex flex-col items-center relative z-20 mb-6">
                      <motion.div
                        className="w-32 h-32 flex items-center justify-center mb-4 max-h-32"
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
          </motion.div>
          <div className="mt-16">
            <BinaryDivider />
          </div>
        </motion.section>

        {/* Thinking Section */}
        <motion.section 
          ref={sectionRefs.thinking}
          id="thinking" 
          className="relative py-48 section-padding text-center"
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
                  className="mb-8"
                  style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
                >
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-mint-400 transition-colors z-10" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-black/20 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 placeholder:text-gray-400 focus:border-mint-400/30 focus:ring-1 focus:ring-mint-400/20 transition-all duration-300 hover:border-white/10 focus:bg-black/20 hover:bg-black/20"
                    />
                  </div>
                </motion.div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {getCurrentPosts().map((post: any) => (
                    <motion.div
                      key={post.id}
                      style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
                    >
                      <Card className="mobile-card unified-card h-[420px] rounded-lg group backdrop-blur-md bg-black/10 border border-white/5 hover:border-white/10 transition-all duration-300">
                        <CardContent className="p-8 flex flex-col h-full text-left">
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
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <motion.div 
                  className="mt-12"
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
                className="text-center text-gray-400"
                style={{ opacity: thinkingContentOpacity, y: thinkingContentY }}
              >
                No blog posts found.
              </motion.p>
            )}
          </motion.div>
          <div className="mt-16">
            <BinaryDivider />
          </div>
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
          <div className="mt-16">
            <BinaryDivider />
          </div>
        </motion.section>

        {/* Connect Section */}
        <motion.section 
          ref={sectionRefs.connect}
          id="connect"
          className="relative py-48"
          initial="hidden"
          animate={useSectionVisibility(sectionRefs.connect) ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <SectionHeader 
            title="CONNECT"
            subtitle="Ready to transform your digital landscape? Let's discuss how we can help secure and elevate your vision."
            scrollYProgress={connectScrollYProgress}
            marginBottomClass="mb-0"
          />
          <motion.div 
            className="relative z-10"
            style={{ opacity: connectContentOpacity, y: connectContentY }}
          >
            <DynamicConnectSection />
          </motion.div>
          <div className="mt-16">
            <BinaryDivider />
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="py-32 content-padding border-t border-white/10 mt-auto relative z-10"
      >
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          style={{ opacity: footerContentOpacity, y: footerContentY }}
        >
          <div className="flex items-center mb-8 md:mb-0">
            <div className="flex space-x-2 mr-4">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">© 2024 Kodex Studio. All rights reserved.</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
