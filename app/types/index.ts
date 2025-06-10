import { z } from "zod";

// Form validation schema
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type FormData = z.infer<typeof formSchema>;

// Expertise Pillar type
export interface ExpertisePillar {
  title: string;
  description: string;
  microcopy: string;
}

// Project type
export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  preview: string;
  category: "security" | "ai" | "data" | "creative";
  techStack: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  repoUrl?: string;
} 