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
  const [formData, setFormData] = useState({
    email: "",
    category: "",
    message: "",
    attachment: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, attachment: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: t("feedbackSubmitted"),
        description: t("thankYouForFeedback"),
      })
      setFormData({
        email: "",
        category: "",
        message: "",
        attachment: null,
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Select value={formData.category} onValueChange={handleSelectChange} required>
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
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {formData.attachment ? formData.attachment.name : t("attachScreenshot")}
          </Button>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
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
