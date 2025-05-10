import { Suspense } from "react"
import DashboardClient from "@/components/dashboard-client"

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="container py-10">Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  )
}
