import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface TOCProps {
    headings: {
        title: string;
        id: string;
    }[]
}

const TOC: React.FC<TOCProps> = ({
    headings
}) => {
    const [activeId, setActiveId] = useState("article-title");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);

            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-24">
                <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    On this page
                </h4>
                <nav className="space-y-3">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className={cn(
                                "block border-l-2 pl-4 text-sm transition-all",
                                activeId === heading.id
                                    ? "border-primary font-medium text-primary"
                                    : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
                            )}
                        >
                            {heading.title}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    )
}

export default TOC;