"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type JobRecommendation = {
  Company: string
  Link: string
  Designation: string
}

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  recommendations?: JobRecommendation[]
}

const VITE_BACKEND_BASE_URL = "http://localhost:8000"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: Message = { id: Date.now(), text: input, sender: "user" }
    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(`${VITE_BACKEND_BASE_URL}/job-recommendations?table_name=cpp-jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const botResponse: Message = {
        id: Date.now(),
        text: "Here are some job recommendations for you:",
        sender: "bot",
        recommendations: data.recommendations,
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error fetching job recommendations:", error)
      let errorMessage = "Sorry, I couldn't fetch job recommendations at the moment. Please try again later."
      
      if (error instanceof Error) {
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          errorMessage = "There was a network error. This might be due to CORS settings. Please check your backend configuration and ensure CORS is properly set up."
        } else if (error.message.includes('CORS')) {
          errorMessage = "A CORS error occurred. Please ensure your backend is configured to allow requests from this origin (http://localhost:8001)."
        }
      }

      const errorResponse: Message = {
        id: Date.now(),
        text: errorMessage,
        sender: "bot",
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/)
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/)
      if (match) {
        const [, linkText, url] = match
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  {linkText}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{url}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
      return part
    })
  }

  const renderRecommendations = (recommendations: JobRecommendation[]) => (
    <ul className="mt-2 space-y-2">
      {recommendations.map((job, index) => (
        <li key={index} className="bg-secondary/50 p-2 rounded">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={job.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  {job.Designation}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{job.Link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-sm text-secondary-foreground">{job.Company}</p>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="flex flex-col h-[90vh] bg-background text-foreground">
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`flex items-start space-x-2 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.sender === "user" ? "U" : "B"}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {renderMessageText(message.text)}
                    {message.recommendations && renderRecommendations(message.recommendations)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t border-border">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}