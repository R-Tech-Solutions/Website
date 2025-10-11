import React, { useMemo, useState } from 'react';
import Header from '../../components/ui/Header';
import BlogHero from './components/BlogHero';
import BlogCard from './components/BlogCard';
import Sidebar from './components/Sidebar';
import POSTS from './data';

export default function BlogsPage() {
  const [query, setQuery] = useState('');
  const posts = useMemo(() => {
    if (!query) return POSTS;
    return POSTS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
      </div>
      <main className="container pt-28 pb-16">
        <BlogHero total={POSTS.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Showing {posts.length} articles</div>
              <div className="w-72">
                <input
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  placeholder="Search articles"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>

          <div>
            <Sidebar onSearch={(q) => setQuery(q)} />
          </div>
        </div>
      </main>
    </>
  );
}
