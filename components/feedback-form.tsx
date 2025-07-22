"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function FeedbackForm() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmissionStatus('submitting');

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: formData,
      });

      // This is the corrected part: Check if the response is OK.
      if (response.ok) {
        toast({
          title: t("feedbackSubmitted"),
          description: t("thankYouForFeedback"),
        })
        setSubmissionStatus('success');
        e.currentTarget.reset();
      } else {
        // If the response is not OK, throw an error to be caught below.
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t("error"),
        description: "Could not submit your feedback. Please try again later.",
        variant: "destructive",
      })
      setSubmissionStatus('error');
    } finally {
      // Reset the button state after 3 seconds, regardless of outcome.
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 3000);
    }
  }

  const renderButtonContent = () => {
    switch (submissionStatus) {
      case 'submitting':
        return <div className="loader"><div></div><div></div><div></div></div>;
      case 'success':
        return <><CheckCircle className="mr-2 h-4 w-4" /> Submitted!</>;
      case 'error':
        return <><XCircle className="mr-2 h-4 w-4" /> Success!</>;
      case 'idle':
      default:
        return <><Send className="mr-2 h-4 w-4" /> {t("submitFeedback")}</>;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New Feedback for TSun-LookUp!" />
      
      <div className="space-y-2">
        <Input
          type="email"
          name="_replyto"
          placeholder={t("emailPlaceholder")}
          required
          disabled={submissionStatus !== 'idle'}
        />
      </div>

      <div className="space-y-2">
        <Select name="category" required disabled={submissionStatus !== 'idle'}>
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
          disabled={submissionStatus !== 'idle'}
        />
      </div>

      <Button 
        type="submit" 
        className={cn("w-full transition-all duration-300 ease-in-out", {
          "bg-green-500 hover:bg-green-600 text-white": submissionStatus === 'success',
          "bg-red-500 hover:bg-red-600 text-white": submissionStatus === 'error',
        })}
        disabled={submissionStatus !== 'idle'}
      >
        {renderButtonContent()}
      </Button>
    </form>
  )
}