"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, Search, Globe, MessageSquare, Github } from "lucide-react"
import FeedbackForm from "@/components/feedback-form"
import LanguageSelector from "@/components/language-selector"
import { UserDataDisplay } from "@/components/user-data-display"
import { ErrorFallback } from "@/components/error-fallback"
import { Changelog } from "@/components/changelog"
import { Footer } from "@/components/footer"
import { ClientOnly } from "@/components/client-only"

export default function Home() {
  const [number, setNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<any[]>([])
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    const numberRegex = /^\d{10,12}$/
    if (!number.trim() || !numberRegex.test(number)) {
      toast({
        title: t("error"),
        description: t("enterValidNumber"),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setUserData([])
    setError(null)

    try {
      const response = await fetch(`/api/search?number=${encodeURIComponent(number)}`)
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      const apiData = await response.json()
      if (apiData.error) throw new Error(apiData.error)

      if (apiData.status === "success" && apiData.data && apiData.data.length > 0) {
        setUserData(apiData.data)
      } else {
        setUserData([])
        toast({ title: t("noDataFound"), variant: "destructive" })
      }
    } catch (error) {
      console.error("API Error:", error)
      setError(t("apiErrorDescription"))
      toast({ title: t("apiError"), description: t("apiErrorDescription"), variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-muted">
      <header className="absolute top-4 right-4 z-10">
        <ClientOnly>
          <div className="flex items-center gap-2">
            <Changelog />
            <LanguageSelector />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t("toggleTheme")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t("toggleTheme")}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </ClientOnly>
      </header>

      <main className="flex flex-grow items-center justify-center p-4 pt-24">
        <Card className="w-full max-w-md shadow-xl border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src="/Icon.jpg" alt="SaeedX" />
                <AvatarFallback>SX</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500">
              °TSun-DataTool
            </CardTitle>
            <CardDescription>{t("searchDescription")}</CardDescription>
          </CardHeader>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">{t("search")}</TabsTrigger>
              <TabsTrigger value="feedback">{t("feedback")}</TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <CardContent className="space-y-4 pt-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder={t("numberPlaceholder")}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") fetchData() }}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={fetchData} disabled={isLoading} className="w-16">
                          {isLoading ? (
                            <div className="loader"><div></div><div></div><div></div></div>
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>{t("searchTooltip")}</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {error && <div className="mt-4"><ErrorFallback error={error} resetErrorBoundary={() => { setError(null); setNumber("") }} /></div>}
                {userData.length > 0 && <div className="mt-4 space-y-4">{userData.map((user, index) => <UserDataDisplay key={index} user={user} />)}</div>}
              </CardContent>
            </TabsContent>

            <TabsContent value="feedback">
              <CardContent className="pt-4"><FeedbackForm /></CardContent>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://wa.link/lcl82c" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://whatsapp.com/channel/0029VaznhJg7z4knyX6oK62T" target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" /> {t("resources")}
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://github.com/SaeedX302" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}