import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { BottomNav } from "@/components/BottomNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </div>
  )
}
