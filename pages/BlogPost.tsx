import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import styles from './BlogPost.module.css';

const BlogNav = () => (
  <nav className="flex items-center justify-between flex-wrap gap-x-4 gap-y-2 py-2 px-3 mb-3 border-b border-border font-mono">
    <Link
      to="/"
      className="text-sm font-semibold group flex items-center gap-0 leading-none"
    >
      <span className="text-muted-foreground group-hover:text-terminal-green transition-colors duration-150">~/</span>
      <span className="text-terminal-green group-hover:text-terminal-bright-green transition-colors duration-150">loudmumble</span>
    </Link>

    <div className="flex items-center flex-wrap text-xs text-muted-foreground leading-none">
      <Link
        to="/"
        className="px-2 py-1 hover:text-terminal-green transition-colors duration-150"
      >
        HOME
      </Link>
      <span className="opacity-30 select-none">|</span>
      <Link
        to="/"
        className="px-2 py-1 hover:text-terminal-green transition-colors duration-150"
      >
        PROJECTS
      </Link>
      <span className="opacity-30 select-none">|</span>
      <span className="px-2 py-1 text-terminal-cyan font-medium" aria-current="page">
        BLOG
      </span>
      <span className="opacity-30 select-none">|</span>
      <Link
        to="/"
        className="px-2 py-1 hover:text-terminal-green transition-colors duration-150"
      >
        CONTACT
      </Link>
      <span className="opacity-30 select-none">|</span>
      <a
        href="https://github.com/loudmumble"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 hover:text-terminal-cyan transition-colors duration-150"
      >
        GITHUB<span className="text-[9px] ml-0.5 opacity-50">↗</span>
      </a>
    </div>
  </nav>
);

const PLACEHOLDER_PATTERN = /\{\{PLACEHOLDER_[^}]+\}\}/g;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setFetchError(true);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadPost = async () => {
      setLoading(true);
      setFetchError(false);

      try {
        const res = await fetch(`/blog/${slug}.md`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const raw = await res.text();
        const cleaned = raw.replace(PLACEHOLDER_PATTERN, '').trim();

        const parseResult = marked.parse(cleaned);
        const parsedHtml = await Promise.resolve(parseResult);

        if (!cancelled) {
          setHtml(parsedHtml);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setFetchError(true);
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const termTitle = `loud@mumble:~/blog/${slug ?? '???'}`;

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
        <BlogNav />
        <TerminalWindow title={termTitle} className="flex-1">
          <div className="flex flex-col min-h-0 overflow-y-auto terminal-scrollbar">

            <div className="mb-6 flex-none">
              <Link
                to="/"
                className="font-mono text-sm text-terminal-cyan hover:text-terminal-green transition-colors duration-150 group"
              >
                <span className="text-muted-foreground">$ </span>
                <span className="group-hover:underline underline-offset-2">cd ~/</span>
                <span className="cursor-blink ml-0.5 text-terminal-green opacity-70">▍</span>
              </Link>
            </div>

            {loading && (
              <div className="font-mono text-sm flex-1">
                <div className="text-muted-foreground mb-2">
                  <span className="text-terminal-cyan">$ </span>
                  cat /blog/{slug}.md
                </div>
                <div className="text-terminal-green animate-pulse">
                  loading<span className="cursor-blink">_</span>
                </div>
              </div>
            )}

            {fetchError && !loading && (
              <div className="font-mono text-sm flex-1 space-y-2">
                <div>
                  <span className="text-muted-foreground">$ </span>
                  <span className="text-foreground">cat /blog/{slug}.md</span>
                </div>
                <div className="text-terminal-red">
                  bash: /blog/{slug}.md: No such file or directory
                </div>
                <div className="text-muted-foreground mt-4 text-xs">
                  exit code: 1
                </div>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="text-terminal-cyan hover:text-terminal-green transition-colors duration-150 underline underline-offset-2"
                  >
                    ← back to terminal
                  </Link>
                </div>
              </div>
            )}

            {!loading && !fetchError && (
              <article
                className={styles.blogContent}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}

          </div>
        </TerminalWindow>

        <footer className="text-center py-4 text-xs text-muted-foreground">
          <span className="text-terminal-green">●</span> SECURE CONNECTION ESTABLISHED
          <span className="mx-2">|</span>
          © {new Date().getFullYear()} loudmumble
          <span className="mx-2">|</span>
          <span className="text-terminal-cyan">v4.2.0</span>
        </footer>
      </div>
    </div>
  );
};

export default BlogPost;
