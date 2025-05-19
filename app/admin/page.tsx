import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AnalyticsDashboard />
    </div>
  )
}
