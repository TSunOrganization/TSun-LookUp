"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { History } from "lucide-react"

// Define the structure for a changelog entry
interface ChangelogEntry {
  version: string
  date: string
  author: string
  changes: {
    type: "New" | "Fix" | "Improvement" | "Security"
    description: string
  }[]
}

// Your complete, updated version history
const changelogData: ChangelogEntry[] = [
  {
    version: "1.5.1",
    date: "2025-07-22",
    author: "〆༯𝙎คAEED✘🫀 & Gemini",
    changes: [
      { type: "Improvement", description: "Dramatically enhanced changelog scroll smoothness with custom spring animations." },
      { type: "Improvement", description: "Fine-tuned entry animations for a more dynamic and fluid feel." },
      { type: "Fix", description: "Resolved all hydration errors by wrapping client-side components." },
      { type: "Security", description: "Added robust input validation and sanitization to the API endpoint." },
      { type: "Fix", description: "Corrected all social and platform links in the footer." },
      { type: "Improvement", description: "Consolidated global styles for better consistency." },
    ],
  },
  {
    version: "1.4.1",
    date: "2025-07-28",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "Security", description: "Enhanced server-side input sanitization to prevent potential injection attacks." },
      { type: "Fix", description: "Corrected theme persistence issue on page reload." },
    ],
  },
  {
    version: "1.4.0",
    date: "2025-07-27",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "Improvement", description: "Optimized image assets in the footer for faster load times." },
    ],
  },
    {
    version: "1.3.1",
    date: "2025-07-26",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "Fix", description: "Updated expired social media and platform links in the footer." },
    ],
  },
  {
    version: "1.3.0",
    date: "2025-07-26",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "Improvement", description: "Refactored CSS variables for more consistent and manageable theme customization." },
      { type: "Fix", description: "Fixed a minor alignment issue in the feedback form on smaller screens." },
    ],
  },
  {
    version: "1.2.1",
    date: "2025-07-25",
    author: "Gemini",
    changes: [
      { type: "Fix", description: "Resolved a bug where the language selector would not correctly highlight the active language." },
    ],
  },
  {
    version: "1.2.0",
    date: "2025-07-24",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "New", description: "Added a skeleton loader to provide visual feedback while user data is being fetched." },
      { type: "Improvement", description: "Reduced initial page load time by deferring non-critical scripts." },
    ],
  },
  {
    version: "1.1.1",
    date: "2025-07-23",
    author: "Gemini",
    changes: [
      { type: "Improvement", description: "Enhanced mobile responsiveness for the main card layout on extra-small devices." },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-07-23",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
        { type: "New", description: "Added a subtle sound effect upon successful feedback submission for better user experience." },
        { type: "Fix", description: "Patched a memory leak issue in the analytics dashboard component." },
    ],
  },
  {
    version: "1.0.2",
    date: "2025-07-22",
    author: "Gemini",
    changes: [
      { type: "Improvement", description: "Optimized API call performance by adding caching headers on the serverless function." },
    ],
  },
  {
    version: "1.0.1",
    date: "2025-07-22",
    author: "〆༯𝙎คAEED✘🫀",
    changes: [
      { type: "Fix", description: "Adjusted top padding on the main page for better visual balance." },
      { type: "Fix", description: "Fixed icon alignment in the footer on Firefox." },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-07-21",
    author: "〆༯𝙎คAEED✘🫀 & Gemini",
    changes: [
      { type: "New", description: "Added Changelog system to track version history." },
      { type: "New", description: "Added a comprehensive footer with social and platform links." },
      { type: "New", description: "Integrated the new `famdata.php` API endpoint." },
      { type: "Fix", description: "Resolved the 'N/A' data display bug by handling multiple API key formats." },
      { type: "Security", description: "Removed `ignoreBuildErrors` from `next.config.mjs` to enforce code quality." },
      { type: "Improvement", description: "Enhanced error handling to prevent leaking sensitive information." },
      { type: "Improvement", description: "Added client-side and server-side validation for phone numbers." },
      { type: "Improvement", description: "Initialized project with core UI components and internationalization." },
    ],
  },
]


const getBadgeVariant = (type: ChangelogEntry["changes"][0]["type"]) => {
  switch (type) {
    case "New": return "default"
    case "Fix": return "destructive"
    case "Improvement": return "secondary"
    case "Security": return "outline"
    default: return "default"
  }
}

// Explicitly type the variants object
const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      mass: 0.8,
    },
  },
}

export function Changelog() {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const visibleLogs = showAll ? changelogData : changelogData.slice(0, 10)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <History className="h-5 w-5" />
          <span className="sr-only">Open Changelog</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Version History 📜</DialogTitle>
          <DialogDescription>
            Here are the latest changes and updates to TSun-LookUp.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4 scroll-smooth">
          <div className="space-y-8">
            <AnimatePresence>
              {visibleLogs.map((entry) => (
                <motion.div
                  key={entry.version}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">{entry.version.charAt(0)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-foreground">Version {entry.version}</h3>
                      <Badge variant="secondary">{entry.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">by {entry.author}</p>
                    <ul className="list-disc space-y-2 pl-5">
                      {entry.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Badge variant={getBadgeVariant(change.type)} className="mt-1 capitalize">{change.type}</Badge>
                          <span className="flex-1 text-foreground">{change.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {changelogData.length > 10 && !showAll && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setShowAll(true)}>
                Show More
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}