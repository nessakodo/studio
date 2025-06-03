import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'WHO WE ARE', href: '#who-we-are' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Connect', href: '#connect' }
];

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%]
          ${isScrolled ? 'backdrop-blur-md bg-black/20' : ''}
          rounded-full px-6 py-3
          transition-all duration-300 flex items-center justify-between
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/kodex-studio-logo.gif" alt="Kodex Studio Logo" width={40} height={40} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Navigation (Side Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />

            {/* Drawer */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-screen bg-black/90 backdrop-blur-md p-6 flex flex-col shadow-lg"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white text-lg font-medium hover:text-white/80 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav; 