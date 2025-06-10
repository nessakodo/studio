"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Mail, Calendar } from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

export default function ConnectSection() {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      
      if (!WEB3FORMS_ACCESS_KEY) {
        console.error('Access key:', WEB3FORMS_ACCESS_KEY);
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

  if (!mounted) {
    return null; // Don't render anything until mounted on client
  }

  return (
    <section id="connect" className="py-48 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mobile-heading md:text-5xl font-light mb-8 text-white">LET'S CONNECT</h2>
          <div className="h-px w-24 bg-gradient-to-r from-mist-400 to-mint-400 mx-auto mb-8"></div>
          <p className="mobile-text text-base text-gray-400 text-base">
            Ready to build something secure and extraordinary? Tell us about your project.
          </p>
        </div>

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
  );
} 