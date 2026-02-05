import { useState, useEffect } from 'react';
import { Navbar } from '@/components/blog/Navbar';
import { HomePage } from '@/components/blog/HomePage';
import { PostDetail } from '@/components/blog/PostDetail';
import { ArchivePage } from '@/components/blog/ArchivePage';
import { AboutPage } from '@/components/blog/AboutPage';
import { Footer } from '@/components/blog/Footer';
import { getPostBySlug, getAllTags, getSortedPosts, getPostsByTag } from '@/lib/posts';
import type { PostMeta } from '@/types/blog';
import './App.css';

type Page = 'home' | 'archive' | 'about' | 'post';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayedPosts, setDisplayedPosts] = useState<PostMeta[]>([]);

  const allPosts = getSortedPosts();
  const allTags = getAllTags();

  useEffect(() => {
    if (selectedTag) {
      setDisplayedPosts(getPostsByTag(selectedTag));
    } else {
      setDisplayedPosts(allPosts);
    }
  }, [selectedTag]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
    setCurrentSlug(null);
    window.scrollTo(0, 0);
  };

  const handlePostClick = (slug: string) => {
    setCurrentSlug(slug);
    setCurrentPage('post');
    window.scrollTo(0, 0);
  };

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage('archive');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentPage('home');
    setCurrentSlug(null);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            posts={allPosts}
            onPostClick={handlePostClick}
            onTagClick={handleTagClick}
          />
        );
      case 'archive':
        return (
          <ArchivePage
            posts={displayedPosts}
            allTags={allTags}
            selectedTag={selectedTag}
            onPostClick={handlePostClick}
            onTagClick={handleTagClick}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'post':
        if (currentSlug) {
          const post = getPostBySlug(currentSlug);
          if (post) {
            return (
              <PostDetail
                post={post}
                onBack={handleBack}
                onTagClick={handleTagClick}
              />
            );
          }
        }
        return (
          <div className="text-center py-16">
            <p className="text-gray-500">文章未找到</p>
            <button
              onClick={handleBack}
              className="mt-4 text-blue-600 hover:underline"
            >
              返回首页
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
