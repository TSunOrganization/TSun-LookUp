import * as React from "react"
import { Button } from "@/components/ui/button"

const platformLinks = [
  { href: "https://linktr.ee/saeedxdie", name: "Linktree Portfolio", icon: "/icons/linktree.png" },
  { href: "https://gravatar.com/cheerfuld27b01881a", name: "Gravatar Profile", icon: "/icons/gravatar.png" },
  { href: "https://tsungpt2.vercel.app/", name: "TSunGpt - 2", icon: "/icons/chatbot.png" },
  { href: "https://tsuntiktokdownloder.vercel.app/", name: "TikTok Downloader", icon: "/icons/tiktok--v1.png" },
  { href: "https://tsun-yt-downloder.vercel.app/", name: "YouTube Downloader", icon: "/icons/youtube-play.png" },
  { href: "https://facebookvideodownloader2.vercel.app", name: "Facebook Downloader", icon: "/icons/facebook--v2.png" },
]

const socialLinks = [
  { href: "https://github.com/SaeedX302", name: "GitHub", icon: "/icons/github.png" },
  { href: "https://x.com/saeedx300", name: "Twitter", icon: "/icons/twitterx.png" },
  { href: "https://www.instagram.com/saeedxdie", name: "Instagram", icon: "/icons/instagram-new--v1.png" },
  { href: "https://t.me/saeedxdie", name: "Telegram", icon: "/icons/telegram-app.png" },
  { href: "https://www.tiktok.com/@saeedxdie", name: "TikTok", icon: "/icons/tiktok--v1.png" },
  { href: "https://www.youtube.com/@TsunMusicOfficial", name: "YouTube", icon: "/icons/youtube-play.png" },
]

export function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto py-8 px-4 text-center text-muted-foreground">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">My Other Platforms</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {platformLinks.map((link) => (
            <Button variant="outline" asChild key={link.name}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <img src={link.icon} alt={`${link.name} icon`} className="w-5 h-5 mr-2" />
                {link.name}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Connect With Me</h3>
        <div className="flex justify-center gap-4">
          {socialLinks.map((link) => (
            <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.name} className="transition-transform hover:scale-110">
              <img src={link.icon} alt={link.name} className="w-8 h-8" />
              <span className="sr-only">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <p className="text-sm">
          Made With 🫀 By 𝙎คAEED✘🫀
        </p>
        <p className="text-xs mt-1">
          © {new Date().getFullYear()} TSun-LookUp. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}