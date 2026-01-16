"use client"

interface Blog {
  id: number
  title: string
  category: string
  description: string
  date: string
  readTime: string
}

interface BlogCardProps {
  blog: Blog
  isSelected: boolean
  onSelect: () => void
}

export function BlogCard({ blog, isSelected, onSelect }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    FINANCE: "bg-blue-100 text-blue-700",
    CAREER: "bg-green-100 text-green-700",
    REGULATIONS: "bg-purple-100 text-purple-700",
    SKILLS: "bg-orange-100 text-orange-700",
    TECHNOLOGY: "bg-indigo-100 text-indigo-700",
  }

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-l-4 transition-all ${
        isSelected ? "bg-white border-blue-600 shadow-md" : "bg-white border-gray-200 hover:bg-gray-100 border-gray-200"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${categoryColors[blog.category] || "bg-gray-100 text-gray-700"}`}
          >
            {blog.category}
          </span>
          <span className="text-xs text-muted-foreground">{blog.date}</span>
        </div>
        <h3 className="font-semibold text-foreground line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
        {isSelected && <p className="text-xs text-blue-600 font-medium">{blog.readTime}</p>}
      </div>
    </button>
  )
}
