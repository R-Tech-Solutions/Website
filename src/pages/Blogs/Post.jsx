import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import POSTS from './data';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = POSTS.find((p) => p.id === id);

  const [comments, setComments] = useState(post?.comments || []);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  if (!post) {
    return (
      <>
        <Header />
        <main className="container pt-28">
          <div className="glass-surface p-8 rounded-lg">Post not found</div>
        </main>
      </>
    );
  }

  const addComment = () => {
    if (!author || !text) return;
    const newComment = { id: `c-${Date.now()}`, author, text, rating };
    setComments((s) => [newComment, ...s]);
    setAuthor('');
    setText('');
  };

  const share = async () => {
    const url = `${window.location.origin}/blogs/${post.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch (e) {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard');
      } catch (e) {
        // fallback
        prompt('Copy this link', url);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container pt-28 pb-16">
        <div className="glass-morphism p-6 sm:p-8 rounded-xl mb-6 w-full max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            {/* Left Section */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold break-words">{post.title}</h1>

              <div className="text-sm text-muted-foreground mt-2">
                By <span className="font-medium text-foreground">{post.author}</span> · {post.published} · {post.readTime}
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs sm:text-sm px-2 py-1 rounded-md bg-accent/10 text-accent-foreground whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Section (Buttons) */}
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 sm:gap-3">
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => navigate('/blogs')}
              >
                Back
              </Button>

              <Button
                size="sm"
                variant="default"
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={share}
              >
                <Icon name="Share" size={16} className="mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>


        <article className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-surface p-6 rounded-lg">
              <p className="text-base leading-relaxed">{post.content}</p>
            </div>

            <div className="glass-surface p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>
              <div className="mt-4 space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="border border-input rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{c.author}</div>
                      <div className="text-sm text-muted-foreground">{Array.from({ length: c.rating }).map((_, i) => '★').join('')}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{c.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">Add a comment</h4>
                <Input placeholder="Your name" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <Input placeholder="Your comment" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="flex items-center gap-3">
                  <label className="text-sm">Rating</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="h-10 rounded-md border border-input px-3">
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} star{r > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div className="mt-2">
                  <Button onClick={addComment}>Post comment</Button>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div className="glass-surface p-4 rounded-lg">
              <h4 className="text-sm font-semibold">Share</h4>
              <p className="text-sm text-muted-foreground mt-2">Share this article with your network.</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="default" onClick={share}><Icon name="Share" size={14} className="mr-2" />Share</Button>
                <Button size="sm" variant="outline" onClick={async () => { try { await navigator.clipboard?.writeText(`${window.location.origin}/blogs/${post.id}`); alert('Link copied'); } catch (e) { prompt('Copy this link', `${window.location.origin}/blogs/${post.id}`); } }}><Icon name="Link" size={14} className="mr-2" />Copy link</Button>
              </div>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}
