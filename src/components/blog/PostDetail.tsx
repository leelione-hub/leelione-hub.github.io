import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { Post } from '@/types/blog';
import 'highlight.js/styles/github.css';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onTagClick: (tag: string) => void;
}

export function PostDetail({ post, onBack, onTagClick }: PostDetailProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-100">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-gray-100">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {post.title}
        </h1>
        
        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-lg text-gray-500 mb-4">
            {post.subtitle}
          </p>
        )}
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <span>Posted by {post.author}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h3>,
              p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="ml-4">{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                    <code className={className}>{children}</code>
                  </pre>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
