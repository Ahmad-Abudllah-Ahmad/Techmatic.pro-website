"use client";



const CATEGORIES = [
    "ALL",
    "WEB DEVELOPMENT",
    "FINANCE",
    "TRAVEL",
    "HEALTHCARE",
    "ADVOCACY",
];

interface FilterBarProps {
    currentFilter: string;
    onFilterChange: (category: string) => void;
}

export function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-8">
            <div className="flex gap-4 md:gap-6 px-6 md:px-20 min-w-max">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => onFilterChange(category)}
                        className={`
                            px-6 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 border border-foreground/20
                            ${currentFilter === category
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-foreground/60 hover:text-foreground hover:border-foreground/40"}
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
