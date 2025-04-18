export default function AdminLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {children}
    </div>
  )
}
