"use client"

import { useState } from "react"
import { BlogList } from "@/components/blog-list"
import { BlogDetail } from "@/components/blog-detail"
import { CreateBlogModal } from "@/components/create-blog-modal"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function BlogPage() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />

      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CA Monk Blog</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest trends in finance, accounting, and career growth
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2" size="lg">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Blog List Sidebar */}
        <div className="w-80 border-r border-border bg-gray-50 overflow-y-auto">
          <BlogList selectedBlogId={selectedBlogId} onSelectBlog={setSelectedBlogId} />
        </div>

        {/* Blog Detail Panel */}
        <div className="flex-1 overflow-y-auto">
          {selectedBlogId ? (
            <BlogDetail blogId={selectedBlogId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a blog to read</p>
            </div>
          )}
        </div>
      </div>

      <CreateBlogModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBlogCreated={setSelectedBlogId}
      />
    </div>
  )
}
