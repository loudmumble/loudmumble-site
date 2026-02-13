import { useState, useCallback, useRef, useEffect } from 'react';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TerminalHUD } from '@/components/terminal/TerminalHUD';
import { SystemInit } from '@/components/terminal/SystemInit';
import { CommandInput } from '@/components/terminal/CommandInput';
import { HelpOutput, NeofetchOutput, WhoamiOutput } from '@/components/terminal/HelpOutput';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

type Section = 'init' | 'about' | 'services' | 'projects' | 'skills' | 'contact';

interface OutputItem {
  id: string;
  type: 'command' | 'output' | 'section';
  content: string | React.ReactNode;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('init');
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [showInit, setShowInit] = useState(true);
  const [autoDisplayDone, setAutoDisplayDone] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      contentRef.current?.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  const addOutput = useCallback((type: OutputItem['type'], content: React.ReactNode) => {
    const id = `${Date.now()}-${Math.random()}`;
    setOutputs(prev => [...prev, { id, type, content }]);
    scrollToBottom();
  }, [scrollToBottom]);

  const clearOutputs = useCallback(() => {
    setOutputs([]);
    setShowInit(false);
  }, []);

  const navigateToSection = useCallback((section: Section) => {
    setActiveSection(section);
    setShowInit(false);

    const sectionComponents: Record<string, React.ReactNode> = {
      about: <AboutSection key={`about-${Date.now()}`} />,
      services: <ServicesSection key={`services-${Date.now()}`} />,
      projects: <ProjectsSection key={`projects-${Date.now()}`} />,
      skills: <SkillsSection key={`skills-${Date.now()}`} />,
      contact: <ContactSection key={`contact-${Date.now()}`} />,
    };

    if (sectionComponents[section]) {
      addOutput('command', `cd ~/${section}`);
      addOutput('section', sectionComponents[section]);
    }
  }, [addOutput]);

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim();

    // Add command to output
    addOutput('command', `$ ${command}`);

    switch (cmd) {
      case 'help':
      case 'h':
      case '?':
        addOutput('output', <HelpOutput key={`help-${Date.now()}`} />);
        break;

      case 'about':
      case 'cat about':
      case 'cat about.txt':
        navigateToSection('about');
        break;

      case 'services':
      case 'ls services':
        navigateToSection('services');
        break;

      case 'projects':
      case 'ls projects':
      case 'tree projects':
        navigateToSection('projects');
        break;

      case 'contact':
      case 'cat contact':
      case 'cat contact.txt':
        navigateToSection('contact');
        break;

      case 'clear':
      case 'cls':
        clearOutputs();
        break;

      case 'whoami':
        addOutput('output', <WhoamiOutput key={`whoami-${Date.now()}`} />);
        break;

      case 'neofetch':
        addOutput('output', <NeofetchOutput key={`neofetch-${Date.now()}`} />);
        break;

      case 'ls':
        addOutput('output', (
          <div className="font-mono text-sm text-terminal-cyan">
            about.txt  contact.txt  projects/  services/  .config/  .ssh/
          </div>
        ));
        break;

      case 'pwd':
        addOutput('output', <span className="text-foreground font-mono text-sm">/home/loud</span>);
        break;

      case 'date':
        addOutput('output', <span className="text-foreground font-mono text-sm">{new Date().toString()}</span>);
        break;

      case 'uptime':
        addOutput('output', (
          <span className="text-foreground font-mono text-sm">
            {new Date().toLocaleTimeString()} up 99 days, 23:59, 1 user, load average: 0.00, 0.00, 0.00
          </span>
        ));
        break;

      case 'skills':
      case 'ls skills':
        navigateToSection('skills');
        break;

      case 'exit':
      case 'logout':
        addOutput('output', <span className="text-terminal-yellow font-mono text-sm">Connection terminated. Refresh to reconnect.</span>);
        break;

      default:
        addOutput('output', (
          <span className="text-terminal-red font-mono text-sm">
            bash: {command}: command not found. Type 'help' for available commands.
          </span>
        ));
    }
  }, [addOutput, navigateToSection, clearOutputs]);

  useKeyboardNavigation(
    (section) => navigateToSection(section as Section),
    clearOutputs
  );

  // Auto-display key sections after boot sequence completes
  useEffect(() => {
    if (autoDisplayDone) return;
    // Boot sequence has 11 lines at 80ms each = ~880ms, plus buffer
    const bootDuration = 1200;
    const timer = setTimeout(() => {
      const sections: { section: Section; component: React.ReactNode }[] = [
        { section: 'about', component: <AboutSection key={`auto-about-${Date.now()}`} /> },
        { section: 'services', component: <ServicesSection key={`auto-services-${Date.now()}`} /> },
        { section: 'projects', component: <ProjectsSection key={`auto-projects-${Date.now()}`} /> },
      ];

      sections.forEach(({ section, component }, i) => {
        setTimeout(() => {
          setOutputs(prev => [
            ...prev,
            { id: `auto-cmd-${section}-${Date.now()}`, type: 'command', content: `cd ~/${section}` },
            { id: `auto-section-${section}-${Date.now()}`, type: 'section', content: component },
          ]);
          setActiveSection(section);
          if (i === sections.length - 1) {
            setAutoDisplayDone(true);
          }
        }, i * 400);
      });

      setShowInit(false);
    }, bootDuration);

    return () => clearTimeout(timer);
  }, [autoDisplayDone]);

  // Auto-scroll on new outputs
  useEffect(() => {
    scrollToBottom();
  }, [outputs, scrollToBottom]);

  return (
    <div className="h-screen bg-background p-2 md:p-4 flex flex-col overflow-hidden">
      {/* Main terminal container */}
      <div className="flex-1 max-w-6xl mx-auto w-full flex flex-col min-h-0">
        <TerminalWindow
          title={`loud@mumble:~${activeSection ? '/' + activeSection : ''}`}
          className="flex-1 min-h-0"
        >
          <div className="flex flex-col h-full min-h-0">
            {/* Header / HUD */}
            <div className="flex-none">
              <TerminalHUD activeSection={activeSection} onNavigate={navigateToSection} />
            </div>

            {/* Scrollable content area */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto py-4 terminal-scrollbar"
            >
              {/* Initial boot sequence */}
              {showInit && <SystemInit />}

              {/* Command outputs */}
              <div className="space-y-4 mt-4">
                {outputs.map((item) => (
                  <div key={item.id} className="fade-in-up">
                    {item.type === 'command' && (
                      <div className="font-mono text-sm text-muted-foreground">
                        {item.content}
                      </div>
                    )}
                    {item.type === 'output' && (
                      <div className="pl-0 md:pl-2">
                        {item.content}
                      </div>
                    )}
                    {item.type === 'section' && (
                      <div className="mt-4">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Command input - fixed at bottom */}
            <div className="border-t border-border pt-4 mt-auto">
              <CommandInput onCommand={handleCommand} />
            </div>
          </div>
        </TerminalWindow>

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-muted-foreground">
          <span className="text-terminal-green">●</span> SECURE CONNECTION ESTABLISHED
          <span className="mx-2">|</span>
          © {new Date().getFullYear()} LOUDMUMBLE
          <span className="mx-2">|</span>
          <span className="text-terminal-cyan">v4.2.0</span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
