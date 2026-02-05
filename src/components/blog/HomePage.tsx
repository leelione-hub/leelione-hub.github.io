import type { PostMeta } from '@/types/blog';
import { PostCard } from './PostCard';

interface HomePageProps {
  posts: PostMeta[];
  onPostClick: (slug: string) => void;
  onTagClick: (tag: string) => void;
}

export function HomePage({ posts, onPostClick, onTagClick }: HomePageProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          「记录技术，分享成长」
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          欢迎来到我的技术博客，这里记录着我的学习笔记、项目经验和技术分享。
        </p>
      </section>

      {/* Posts List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">最新文章</h2>
          <span className="text-sm text-gray-500">共 {posts.length} 篇</span>
        </div>
        
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.slug)}
              onTagClick={onTagClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
