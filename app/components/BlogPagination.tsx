"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface BlogPaginationProps {
  totalPosts: number
  postsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  onSearch: (query: string) => void
  hideSearch?: boolean
}

export default function BlogPagination({
  totalPosts,
  postsPerPage,
  currentPage,
  onPageChange,
  onSearch,
  hideSearch = false,
}: BlogPaginationProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      {/* Search Bar */}
      {!hideSearch && (
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-mint-400 transition-colors z-10" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-4 bg-black/20 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 placeholder-gray-400 focus:border-mint-400/30 focus:ring-1 focus:ring-mint-400/20 transition-all duration-300 hover:border-white/10 focus:bg-black/20 hover:bg-black/20"
          />
        </motion.div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group w-full sm:w-32 px-4 py-2 bg-black/10 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 hover:bg-black/20 hover:border-white/10 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-black/10 disabled:hover:border-white/5"
        >
          <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center space-x-2">
          <AnimatePresence mode="wait">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.div
                key={page}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={currentPage === page ? "default" : "ghost"}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-300 ${
                    currentPage === page 
                      ? "bg-black/20 text-mint-400 border border-mint-400/30 hover:border-mint-400/40" 
                      : "bg-black/10 text-gray-200 border border-white/5 hover:bg-black/20 hover:border-white/10"
                  }`}
                >
                  {page}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group w-full sm:w-32 px-4 py-2 bg-black/10 border border-white/5 rounded-lg backdrop-blur-md text-gray-200 hover:bg-black/20 hover:border-white/10 transition-all duration-300 disabled:opacity-50 disabled:hover:bg-black/10 disabled:hover:border-white/5"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  )
} 