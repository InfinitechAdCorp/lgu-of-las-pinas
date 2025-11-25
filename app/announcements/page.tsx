"use client"
import PageLayout from "@/components/page-layout"
import AnnouncementsSection from "@/components/announcements-section"

export default function AnnouncementsPage() {
  return (
    <PageLayout
      title="Announcements"
      subtitle="Stay updated with the latest news from Calapan City"
      image="/announcement_banner.png"
    >
      <AnnouncementsSection />
    </PageLayout>
  )
}