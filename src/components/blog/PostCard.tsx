import { Calendar, Tag } from 'lucide-react';
import type { PostMeta } from '@/types/blog';

interface PostCardProps {
  post: PostMeta;
  onClick: () => void;
  onTagClick: (tag: string) => void;
}

export function PostCard({ post, onClick, onTagClick }: PostCardProps) {
  return (
    <article className="group bg-white rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Title */}
      <h2 
        onClick={onClick}
        className="text-xl font-bold text-gray-900 mb-2 cursor-pointer group-hover:text-blue-600 transition-colors"
      >
        {post.title}
      </h2>
      
      {/* Subtitle */}
      {post.subtitle && (
        <p className="text-sm text-gray-500 mb-3">
          {post.subtitle}
        </p>
      )}
      
      {/* Excerpt */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
        {/* Date */}
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{post.date}</span>
        </div>
        
        {/* Author */}
        <span>Posted by {post.author}</span>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => {
              e.stopPropagation();
              onTagClick(tag);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </button>
        ))}
      </div>
    </article>
  );
}
