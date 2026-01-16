"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
          <span className="font-bold text-foreground">CA MONK</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm text-foreground hover:text-blue-600 transition">
            Tools
          </Link>
          <Link href="#" className="text-sm text-foreground hover:text-blue-600 transition">
            Practice
          </Link>
          <Link href="#" className="text-sm text-foreground hover:text-blue-600 transition">
            Events
          </Link>
          <Link href="#" className="text-sm text-foreground hover:text-blue-600 transition">
            Job Board
          </Link>
          <Link href="#" className="text-sm text-foreground hover:text-blue-600 transition">
            Points
          </Link>
        </div>

        {/* Profile Button */}
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Profile</Button>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
