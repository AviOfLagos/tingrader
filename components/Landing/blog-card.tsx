"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  url: string;
  delay?: number;
}

export function BlogCard({
  title,
  excerpt,
  image,
  author,
  date,
  url,
  delay = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span>{author.name}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {title}
            <ArrowUpRight className="inline-block ml-1 h-4 w-4" />
          </h3>
          <p className="text-muted-foreground">{excerpt}</p>
        </div>
      </Link>
    </motion.div>
  );
}