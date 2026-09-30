import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_ITEMS } from '@/shared/utils/constants/appConstants';

interface AnimatedPlaceholderInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSearchSubmit: () => void;
    placeholders?: string[];
    intervalDuration?: number;
}

export const AnimatedPlaceholderInput: React.FC<AnimatedPlaceholderInputProps> = ({
    value,
    onChange,
    onKeyDown,
    onSearchSubmit,
    placeholders = DEFAULT_ITEMS,
    intervalDuration = 2500,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (value || isFocused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        }, intervalDuration);

        return () => clearInterval(interval);
    }, [value, isFocused, placeholders.length, intervalDuration]);

    return (
        <div className="relative flex-1 sm:w-80 group">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-20 pointer-events-none" />
            <Input
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=""
                className="pl-10 pr-20 h-11 rounded-xl bg-background/50 backdrop-blur-md border border-border/60 shadow-sm transition-all duration-200 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary relative z-10"
            />

            {!value && !isFocused && (
                <div className="absolute left-10 top-0 bottom-0 right-20 flex items-center pointer-events-none z-15 overflow-hidden text-sm text-muted-foreground/70">
                    <span className="mr-1 font-normal select-none">Search</span>
                    <div className="relative h-5 overflow-hidden flex-1">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentIndex}
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -15, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="absolute inset-0 flex items-center truncate"
                            >
                                {placeholders[currentIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
            )}
            <Button
                size="sm"
                onClick={onSearchSubmit}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 rounded-lg text-xs font-medium shadow-none z-20"
            >
                Search
            </Button>
        </div>
    );
};