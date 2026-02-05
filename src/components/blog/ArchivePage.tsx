import { Tag, Calendar } from 'lucide-react';
import type { PostMeta } from '@/types/blog';

interface ArchivePageProps {
  posts: PostMeta[];
  allTags: string[];
  selectedTag: string | null;
  onPostClick: (slug: string) => void;
  onTagClick: (tag: string | null) => void;
}

export function ArchivePage({ 
  posts, 
  allTags, 
  selectedTag, 
  onPostClick, 
  onTagClick 
}: ArchivePageProps) {
  // 按年份分组
  const groupedPosts = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, PostMeta[]>);

  const sortedYears = Object.keys(groupedPosts).sort((a, b) => 
    parseInt(b) - parseInt(a)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          文章归档
        </h1>
        <p className="text-gray-600">
          共 {posts.length} 篇文章，{allTags.length} 个标签
        </p>
      </section>

      {/* Tags Filter */}
      <section className="bg-white rounded-lg border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-900">标签筛选</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagClick(null)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Posts by Year */}
      <section className="space-y-8">
        {sortedYears.map((year) => (
          <div key={year}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {year}
            </h3>
            <div className="space-y-3">
              {groupedPosts[year].map((post) => (
                <div
                  key={post.id}
                  onClick={() => onPostClick(post.slug)}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    {post.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
