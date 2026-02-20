import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  shortcut: string;
  href?: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'ABOUT', shortcut: 'F1' },
  { id: 'services', label: 'SERVICES', shortcut: 'F2' },
  { id: 'projects', label: 'PROJECTS', shortcut: 'F3' },
  { id: 'blog', label: 'BLOG', shortcut: 'F5', href: '#/blog/de-voidlink' },
  { id: 'contact', label: 'CONTACT', shortcut: 'F4' },
  { id: 'github', label: 'GITHUB', shortcut: '↗', href: 'https://github.com/loudmumble', external: true },
];

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const isHovered = hoveredItem === item.id;

        const handleClick = () => {
          if (item.external && item.href) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          } else if (item.href) {
            window.location.hash = item.href.replace('#', '');
          } else {
            onNavigate(item.id);
          }
        };

        return (
          <button
            key={item.id}
            onClick={handleClick}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              group relative px-3 md:px-4 py-1.5 font-mono text-xs md:text-sm font-medium
              transition-all duration-200 border
              ${isActive
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }
            `}
            style={{
              boxShadow: isActive || isHovered
                ? '0 0 10px hsl(120 100% 50% / 0.3)'
                : 'none'
            }}
          >
            <span className="text-muted-foreground/60 mr-1 text-[10px] md:text-xs hidden sm:inline">
              [{item.shortcut}]
            </span>
            <span>{item.label}</span>
            {item.external && (
              <ExternalLink className="inline-block ml-1 w-3 h-3 opacity-50" />
            )}

            {/* Hover underline effect */}
            <span
              className={`
                absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-300
                ${isActive || isHovered ? 'w-full' : 'w-0'}
              `}
            />
          </button>
        );
      })}
    </nav>
  );
};
