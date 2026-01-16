"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onBlogCreated?: (id: number) => void
}

export function CreateBlogModal({ isOpen, onClose, onBlogCreated }: CreateBlogModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "FINANCE",
    description: "",
    content: "",
    author: "",
    authorRole: "",
  })

  const queryClient = useQueryClient()

  const { mutate: createBlog, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      const newBlog = {
        id: Date.now(),
        ...data,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        readTime: `${Math.ceil(data.content.split(" ").length / 200)} min read`,
        image: "/blog-article.jpg",
      }

      try {
        const response = await fetch("http://localhost:3001/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        })
        if (!response.ok) throw new Error("Failed to create blog")
        return newBlog
      } catch {
        console.log("JSON Server not available, using local storage")
        return newBlog
      }
    },
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      if (onBlogCreated) {
        onBlogCreated(newBlog.id)
      }
      setFormData({
        title: "",
        category: "FINANCE",
        description: "",
        content: "",
        author: "",
        authorRole: "",
      })
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBlog(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Article</DialogTitle>
          <DialogDescription>Share your insights with the CA Monk community</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              required
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                  <SelectItem value="CAREER">Career</SelectItem>
                  <SelectItem value="REGULATIONS">Regulations</SelectItem>
                  <SelectItem value="SKILLS">Skills</SelectItem>
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Author</label>
              <Input
                required
                placeholder="Your name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Author Role</label>
            <Input
              placeholder="e.g., Senior Financial Analyst"
              value={formData.authorRole}
              onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              required
              placeholder="Brief description of your article"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-2 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Content</label>
            <Textarea
              required
              placeholder="Write your article content here. Use ## for headings, - for lists, etc."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-2 resize-none font-mono text-sm"
              rows={8}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Publishing..." : "Publish Article"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
