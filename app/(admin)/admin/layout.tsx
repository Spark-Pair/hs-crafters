import { AdminGuardShell } from '@/components/sections/admin/AdminGuardShell'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminGuardShell>{children}</AdminGuardShell>
}
