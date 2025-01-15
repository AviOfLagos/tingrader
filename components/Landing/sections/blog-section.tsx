import { BlogCard } from "@/components/Landing/blog-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const featuredPosts = [
  {
    title: "How AI is Revolutionizing Assignment Grading",
    excerpt: "Discover how artificial intelligence is making grading more efficient and fair for educators worldwide.",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100"
    },
    date: "Jan 10, 2024",
    url: "https://example.com/blog/ai-grading"
  },
  {
    title: "Best Practices for Quick and Fair Grading",
    excerpt: "Learn the top strategies for maintaining consistency and speed in your grading process.",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100"
    },
    date: "Jan 8, 2024",
    url: "https://example.com/blog/grading-practices"
  },
  {
    title: "The Future of Education Technology",
    excerpt: "Explore upcoming trends in EdTech and how they will shape the future of education.",
    image: "/placeholder.svg?height=400&width=600",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100"
    },
    date: "Jan 5, 2024",
    url: "https://example.com/blog/edtech-future"
  }
]

export function BlogSection() {
  return (
    <SectionWrapper className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Latest from our blog
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay up to date with the latest trends in education technology
            and grading best practices.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <BlogCard key={index} {...post} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

