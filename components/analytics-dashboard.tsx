"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data - in a real app, you would fetch this from your analytics API
const mockData = {
  today: [
    { hour: "00:00", views: 12 },
    { hour: "04:00", views: 8 },
    { hour: "08:00", views: 25 },
    { hour: "12:00", views: 45 },
    { hour: "16:00", views: 32 },
    { hour: "20:00", views: 18 },
  ],
  week: [
    { day: "Mon", views: 120 },
    { day: "Tue", views: 145 },
    { day: "Wed", views: 132 },
    { day: "Thu", views: 167 },
    { day: "Fri", views: 189 },
    { day: "Sat", views: 112 },
    { day: "Sun", views: 95 },
  ],
  month: [
    { date: "Week 1", views: 845 },
    { date: "Week 2", views: 932 },
    { date: "Week 3", views: 1023 },
    { date: "Week 4", views: 856 },
  ],
}

export function AnalyticsDashboard() {
  const { t } = useTranslation()
  const [totalViews, setTotalViews] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)

  useEffect(() => {
    // Simulate fetching analytics data
    const calculateTotalViews = () => {
      return mockData.month.reduce((sum, item) => sum + item.views, 0)
    }

    setTotalViews(calculateTotalViews())
    setActiveUsers(Math.floor(Math.random() * 15) + 5) // Random number between 5-20
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("analyticsDashboard")}</CardTitle>
        <CardDescription>{t("pageViewsAndVisitors")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{t("totalPageViews")}</div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{activeUsers}</div>
            <div className="text-sm text-muted-foreground">{t("currentActiveUsers")}</div>
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">{t("today")}</TabsTrigger>
            <TabsTrigger value="week">{t("thisWeek")}</TabsTrigger>
            <TabsTrigger value="month">{t("thisMonth")}</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.today}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="week" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.week}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="month" className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.month}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
