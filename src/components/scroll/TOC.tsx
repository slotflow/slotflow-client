import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { TOCHeadingProps } from "@/shared/interface/commonInterface";

interface TOCProps {
    headings: TOCHeadingProps[];
}

const flattenHeadings = (
    items: TOCHeadingProps[]
): TOCHeadingProps[] =>
    items.flatMap((item) => [
        item,
        ...(item.children ? flattenHeadings(item.children) : []),
    ]);

const containsActiveHeading = (
    heading: TOCHeadingProps,
    activeId: string
): boolean => {
    if (heading.id === activeId) return true;

    return (
        heading.children?.some((child) =>
            containsActiveHeading(child, activeId)
        ) ?? false
    );
};

const TOC: React.FC<TOCProps> = ({ headings }) => {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0,
            }
        );

        const allHeadings = flattenHeadings(headings);

        allHeadings.forEach(({ id }) => {
            const element = document.getElementById(id);

            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const renderHeadings = (
        items: TOCHeadingProps[],
        level = 0
    ) => {
        return items.map((heading) => {
            const expanded = containsActiveHeading(
                heading,
                activeId
            );

            return (
                <div key={heading.id}>
                    <a
                        href={`#${heading.id}`}
                        className={cn(
                            "block border-l-2 py-1 text-sm transition-all duration-200",
                            level === 0 ? "pl-4" : "pl-8",
                            activeId === heading.id
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-muted-foreground hover:border-muted hover:text-foreground"
                        )}
                    >
                        {heading.title}
                    </a>

                    {heading.children &&
                        heading.children.length > 0 &&
                        expanded && (
                            <div className="mt-1 space-y-1 ml-2">
                                {renderHeadings(
                                    heading.children,
                                    level + 1
                                )}
                            </div>
                        )}
                </div>
            );
        });
    };

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-24">
                <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    On this page
                </h4>

                <nav className="space-y-2 cursor-pointer">
                    {renderHeadings(headings)}
                </nav>
            </div>
        </aside>
    );
};

export default TOC;