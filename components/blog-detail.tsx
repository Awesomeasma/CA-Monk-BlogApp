"use client"

import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogDetailProps {
  blogId: number
}

interface Blog {
  id: number
  title: string
  category: string
  content: string
  readTime: string
  date: string
  author: string
  authorRole: string
  image: string
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogs/${blogId}`)
        if (!response.ok) throw new Error("Failed to fetch blog")
        return response.json()
      } catch {
        console.log("JSON Server not available, using local storage")
        const localResponse = await fetch("/db.json")
        const data = await localResponse.json()
        return data.blogs.find((b: Blog) => b.id === blogId)
      }
    },
  })

  if (isLoading) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a blog to read</p>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      {/* Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-blue-600">{blog.category}</span>
            <span className="text-sm text-muted-foreground">{blog.readTime}</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share Article
          </Button>
        </div>

        <h1 className="text-4xl font-bold text-foreground text-balance">{blog.title}</h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">{blog.author}</p>
              <p className="text-xs text-muted-foreground">{blog.authorRole}</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{blog.date}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          width={700}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {blog.content.split("\n\n").map((paragraph: string, idx: number) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-foreground mt-8 mb-4">
                {paragraph.replace("## ", "")}
              </h2>
            )
          }
          if (paragraph.startsWith("- ")) {
            return (
              <ul key={idx} className="list-disc list-inside space-y-2 text-foreground/80 my-4">
                {paragraph.split("\n").map((item: string, i: number) => (
                  <li key={i} className="ml-2">
                    {item.replace("- ", "")}
                  </li>
                ))}
              </ul>
            )
          }
          if (paragraph.match(/^\d+\. /)) {
            return (
              <ol key={idx} className="list-decimal list-inside space-y-2 text-foreground/80 my-4">
                {paragraph.split("\n").map((item: string, i: number) => (
                  <li key={i} className="ml-2">
                    {item.replace(/^\d+\. /, "")}
                  </li>
                ))}
              </ol>
            )
          }
          return (
            <p key={idx} className="text-foreground/80 leading-relaxed my-4">
              {paragraph}
            </p>
          )
        })}
      </div>
    </article>
  )
}
