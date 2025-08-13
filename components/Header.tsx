import React from 'react';

const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a10 10 0 0 0-3.54 19.54"/>
        <path d="M12 2a10 10 0 0 1 3.54 19.54"/>
        <path d="M4 12H2"/>
        <path d="M22 12h-2"/>
        <path d="M12 4V2"/>
        <path d="M12 22v-2"/>
        <path d="M17 17l1.5 1.5"/>
        <path d="M5.5 5.5 7 7"/>
        <path d="M7 17l-1.5 1.5"/>
        <path d="M18.5 5.5 17 7"/>
        <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
        <path d="M12 16a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"/>
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="text-center my-6 md:my-10">
            <div className="flex items-center justify-center gap-4">
                <BrainCircuitIcon className="w-10 h-10 text-sky-400" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                    InsightLens
                </h1>
            </div>
            <p className="mt-4 text-lg text-slate-400">Go beyond the surface. Understand videos from first principles.</p>
        </header>
    );
}