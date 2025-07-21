"use client"

import * as React from "react"
import { useState } from "react"
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

// Your version history data
// I've added the first entry for all the changes we've made so far!
const changelogData: ChangelogEntry[] = [
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
  // Add new versions here in the future
]

const getBadgeVariant = (type: ChangelogEntry["changes"][0]["type"]) => {
  switch (type) {
    case "New":
      return "default"
    case "Fix":
      return "destructive"
    case "Improvement":
      return "secondary"
    case "Security":
      return "outline"
    default:
      return "default"
  }
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
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-8">
            {visibleLogs.map((entry) => (
              <div key={entry.version} className="relative pl-8">
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
              </div>
            ))}
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
