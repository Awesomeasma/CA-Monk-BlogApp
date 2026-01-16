"use client"

import { useQuery } from "@tanstack/react-query"
import { BlogCard } from "./blog-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Blog {
  id: number
  title: string
  category: string
  description: string
  date: string
  readTime: string
}

interface BlogListProps {
  selectedBlogId: number | null
  onSelectBlog: (id: number) => void
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3001/blogs")
        if (!response.ok) throw new Error("Failed to fetch blogs")
        return response.json()
      } catch {
        console.log("Using fallback blog data from local db.json")
        const localResponse = await fetch("/db.json")
        const data = await localResponse.json()
        return data.blogs
      }
    },
  })

  if (error && !blogs) {
    return (
      <div className="p-4">
        <p className="text-sm text-red-500">Error loading blogs. Make sure JSON Server is running on port 3001.</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold text-foreground mb-4">Latest Articles</h2>

      {isLoading ? (
        <>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </>
      ) : (
        blogs?.map((blog: Blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            isSelected={blog.id === selectedBlogId}
            onSelect={() => onSelectBlog(blog.id)}
          />
        ))
      )}
    </div>
  )
}
