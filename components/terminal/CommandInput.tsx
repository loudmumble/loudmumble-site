import { useState, useRef, useEffect } from 'react';

interface CommandInputProps {
  onCommand: (command: string) => void;
  suggestions?: string[];
}

const availableCommands = [
  'help',
  'about',
  'services',
  'projects',
  'skills',
  'contact',
  'clear',
  'whoami',
  'ls',
  'cat',
  'neofetch',
];

export const CommandInput = ({ onCommand }: CommandInputProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim().toLowerCase());
      setHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setShowSuggestions(true);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = input
    ? availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()))
    : [];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-0 font-mono text-sm">
        <span className="text-terminal-cyan">loudmumble</span>
        <span className="text-muted-foreground">@</span>
        <span className="text-terminal-magenta">kitty</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-terminal-blue">~</span>
        <span className="text-foreground">% </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="flex-1 bg-transparent outline-none text-terminal-bright-green caret-transparent"
          placeholder="type 'help' for commands..."
          autoComplete="off"
          spellCheck={false}
        />
        <span className="cursor-blink text-terminal-green -ml-1">▊</span>
      </form>

      {/* Autocomplete suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded shadow-lg z-50">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className="block w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      <div className="absolute right-0 top-0 text-[10px] text-muted-foreground/50">
        Press <kbd className="px-1 py-0.5 bg-muted/50 rounded text-muted-foreground">/</kbd> to focus
      </div>
    </div>
  );
};
