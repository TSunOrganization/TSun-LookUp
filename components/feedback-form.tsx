"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Upload } from "lucide-react"

export default function FeedbackForm() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL!, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: t("feedbackSubmitted"),
          description: t("thankYouForFeedback"),
        })
        e.currentTarget.reset(); // Clear form fields
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error("Formspree error:", error);
      toast({
        title: t("error"),
        description: "Could not submit your feedback. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New Feedback for TSun-LookUp!" />
      
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          required
        />
      </div>

      <div className="space-y-2">
        <Select name="category" required>
          <SelectTrigger>
            <SelectValue placeholder={t("selectCategory")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bug">{t("bug")}</SelectItem>
            <SelectItem value="feature">{t("featureRequest")}</SelectItem>
            <SelectItem value="content">{t("contentIssue")}</SelectItem>
            <SelectItem value="other">{t("other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder={t("feedbackMessage")}
          required
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Input id="file-upload" type="file" name="attachment" accept="image/*" />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="animate-spin">⏳</div>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t("submitFeedback")}
          </>
        )}
      </Button>
    </form>
  )
}