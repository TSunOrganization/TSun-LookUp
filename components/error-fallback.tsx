"use client"

import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ErrorFallbackProps {
  error?: string
  resetErrorBoundary?: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useTranslation()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          {t("apiError")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{error || t("apiErrorDescription")}</p>
        <div className="mt-4 p-3 bg-muted/50 rounded-md text-xs font-mono overflow-auto">
          <code>{error || "Failed to fetch data from the API"}</code>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={resetErrorBoundary} variant="outline" className="w-full">
          {t("tryAgain")}
        </Button>
      </CardFooter>
    </Card>
  )
}
