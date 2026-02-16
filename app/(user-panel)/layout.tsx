import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { BottomNav } from "@/components/BottomNav"
import AppShell from "@/components/AppShell"
import SmoothScroll from "@/components/SmoothScroll"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg)] min-h-screen overflow-x-hidden">
      <SmoothScroll />

      <Navbar />

      <main>
        <AppShell>{children}</AppShell>
      </main>

      <Footer />
      <BottomNav />
    </div>
  )
}
