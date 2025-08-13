import React, { useState, useEffect } from 'react';
import type { VideoSummary, FirstPrinciple } from '../types';

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 6 9 17l-5-5"></path>
    </svg>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    return (
        <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors duration-200" aria-label="Copy to clipboard">
            {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4 text-slate-400" />}
        </button>
    );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode; textToCopy: string; }> = ({ title, children, textToCopy }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6 relative">
        <CopyButton textToCopy={textToCopy} />
        <h3 className="text-xl font-bold text-sky-400 mb-3">{title}</h3>
        {children}
    </div>
);

const formatListToCopy = (title: string, items: string[]): string => {
    return `${title}\n\n${items.map(item => `- ${item}`).join('\n')}`;
};

const formatPrinciplesToCopy = (title: string, items: FirstPrinciple[]): string => {
    return `${title}\n\n${items.map(item => `Principle: ${item.principle}\nExplanation: ${item.explanation}`).join('\n\n')}`;
}

export const SummaryDisplay: React.FC<{ summary: VideoSummary }> = ({ summary }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-4">{summary.videoTitle}</h2>

            <SectionCard title="🧠 Core Concept (Feynman Technique)" textToCopy={`Core Concept\n\n${summary.coreConcept}`}>
                <p className="text-slate-300 leading-relaxed">{summary.coreConcept}</p>
            </SectionCard>

            <SectionCard title="🧱 First Principles" textToCopy={formatPrinciplesToCopy("First Principles", summary.firstPrinciples)}>
                <ul className="space-y-4">
                    {summary.firstPrinciples.map((point, index) => (
                        <li key={index} className="p-4 bg-slate-900/50 rounded-lg">
                            <h4 className="font-semibold text-slate-100">{point.principle}</h4>
                            <p className="text-slate-400 mt-1">{point.explanation}</p>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            <SectionCard title="🔑 Key Takeaways" textToCopy={formatListToCopy("Key Takeaways", summary.summaryPoints)}>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {summary.summaryPoints.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
            </SectionCard>

            <SectionCard title="💡 Simple Analogies" textToCopy={formatListToCopy("Simple Analogies", summary.analogies)}>
                 <ul className="list-disc list-inside space-y-2 text-slate-300">
                    {summary.analogies.map((analogy, index) => <li key={index}>{analogy}</li>)}
                </ul>
            </SectionCard>
        </div>
    );
};