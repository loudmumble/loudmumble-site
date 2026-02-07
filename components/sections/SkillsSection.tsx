import { TerminalLine, TerminalDivider } from '../terminal/TerminalLine';

interface SkillCategory {
    name: string;
    skills: { name: string; level: number; max: number }[];
    color: string;
}

const skillCategories: SkillCategory[] = [
    {
        name: 'OFFENSIVE SECURITY',
        color: 'text-terminal-red',
        skills: [
            { name: 'Network Penetration', level: 7, max: 10 },
            { name: 'Web App Security', level: 6, max: 10 },
            { name: 'Active Directory', level: 7, max: 10 },
            { name: 'OSINT / Recon', level: 7, max: 10 },
            { name: 'Privilege Escalation', level: 6, max: 10 },
        ]
    },
    {
        name: 'INFRASTRUCTURE',
        color: 'text-terminal-blue',
        skills: [
            { name: 'Linux/Unix', level: 7, max: 10 },
            { name: 'Windows', level: 6, max: 10 },
            { name: 'Networking', level: 7, max: 10 },
            { name: 'Cloud (Azure)', level: 5, max: 10 },
        ]
    },
    {
        name: 'DEVELOPMENT',
        color: 'text-terminal-green',
        skills: [
            { name: 'Python', level: 6, max: 10 },
            { name: 'JavaScript/TypeScript', level: 6, max: 10 },
            { name: 'Bash/Scripting', level: 7, max: 10 },
            { name: 'SQL', level: 5, max: 10 },
        ]
    }
];

export const SkillsSection = () => {
    const renderProgressBar = (level: number, max: number, color: string) => {
        const filled = '█'.repeat(level);
        const empty = '░'.repeat(max - level);
        return (
            <span className="font-mono">
                <span className={color}>{filled}</span>
                <span className="text-muted-foreground/30">{empty}</span>
            </span>
        );
    };

    return (
        <div className="fade-in-up">
            <TerminalLine prefix="CMD" prefixColor="cyan">
                ./show_skills.py --verbose
            </TerminalLine>

            <TerminalDivider />

            <div className="space-y-6 stagger-children">
                {skillCategories.map((category, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className={`font-bold ${category.color} border-b border-white/10 pb-1 mb-2`}>
                            [{category.name}]
                        </div>

                        <div className="grid gap-2 pl-2">
                            {category.skills.map((skill, sIdx) => (
                                <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 text-sm hover:bg-white/5 p-1 rounded transition-colors">
                                    <span className="text-foreground/90 font-mono w-40">{skill.name}</span>
                                    <div className="flex items-center gap-2">
                                        {renderProgressBar(skill.level, skill.max, category.color.replace('text-', 'text-'))}
                                        <span className="text-xs text-muted-foreground w-12 text-right">
                                            {Math.round((skill.level / skill.max) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <TerminalDivider />

            <div className="p-3 bg-muted/20 rounded border border-white/10 text-sm">
                <span className="text-terminal-yellow">certifications_loaded:</span> industry_pentest_certs: 1 | cloud_fundamentals: 4 | active_study: 2
            </div>

            <div className="mt-3 text-xs text-muted-foreground/50 font-mono">
                try: <span className="text-primary/60">projects</span>
            </div>
        </div>
    );
};
