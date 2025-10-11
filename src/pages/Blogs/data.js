// Centralized posts data with 12-digit random-like ids
const POSTS = [
  {
    id: '847126309512',
    title: 'Building Lightning-fast UIs with Vite and React',
    excerpt: 'How we used Vite, React and smart bundling strategies to reduce TTFB and JS payloads for a 2MB app down to 300kb.',
    content: `We explored code-splitting, route-level lazy loading, and server-side rendering techniques. Benchmarks showed a 3x improvement in first meaningful paint.`,
    author: 'R-Tech Team',
    published: 'Oct 2025',
    readTime: '6 min',
    image: '/new brand.png',
    tags: ['Vite', 'Performance', 'React'],
    comments: [
      { id: 'c1', author: 'Jane', text: 'Great write-up — very actionable!', rating: 5 },
    ],
  },
  {
    id: '530198472163',
    title: 'Design Systems: From Tokens to Tooling',
    excerpt: 'A practical guide on scaling design systems, token strategy, and integrating with Tailwind.',
    content: 'We outline token naming, automation for theme generation, and how to keep tokens in sync across platforms.',
    author: 'Design Team',
    published: 'Sep 2025',
    readTime: '8 min',
    image: '/logo1.jpg',
    tags: ['Design', 'Tailwind', 'Systems'],
    comments: [],
  },
  {
    id: '920374615807',
    title: 'Progressive Enhancement: Accessibility-first',
    excerpt: 'Strategies to build accessible components that work for everyone and how to test them in CI.',
    content: 'Focus on semantics, keyboard support, ARIA when needed, and automated a11y tests.',
    author: 'Accessibility Team',
    published: 'Aug 2025',
    readTime: '5 min',
    image: '/new brand.png',
    tags: ['Accessibility', 'Testing'],
    comments: [],
  },
];

export default POSTS;
