import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="glass-surface p-6 rounded-xl shadow-glass-subtle hover:shadow-glass-interactive transform hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 fade-up w-full">
      <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
        <div className="relative">
          <img src={post.image} alt={post.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent shadow-glass-interactive animate-floatX"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{post.published}</div>
                <div className="text-xs text-muted-foreground">{post.readTime} read</div>
              </div>
              <h3 className="mt-2 text-lg font-semibold gradient-accent break-words">{post.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2 break-words">{post.excerpt}</p>
            </div>

            <div className="flex-shrink-0 mt-3 sm:mt-0">
              <Button asChild size="sm" variant="link">
                <Link to={`/blogs/${post.id}`}>Read more →</Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {(post.tags || []).slice(0,2).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent break-words">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
