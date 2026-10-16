import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ServiceCategory } from '@/shared/types/enums';
import MoveUpward from '@/components/animation/MoveUpward';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { Search, Check, ArrowRight, Sparkles } from 'lucide-react';
import { redirectPaths } from '@/shared/utils/constants/routeConstants';

const UserSelectService = () => {
  const { goTo } = useAppNavigation();
  const [search, setSearch] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);

  const handleCategoryToggle = (category: ServiceCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const handleNext = () => {
    if (selectedCategories.length > 0) {
      const categoriesParam = encodeURIComponent(selectedCategories.join(','));
      goTo(`${redirectPaths.SERVICE_PROVIDERS}?categories=${categoriesParam}`);
    } else {
      goTo(redirectPaths.SERVICE_PROVIDERS);
    }
  };

  const filteredCategories = Object.values(ServiceCategory).filter((category) =>
    category.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="relative min-h-full flex flex-col justify-between pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <MoveUpward>
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-6 pt-8 pb-4 text-center">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border-primary/20 bg-primary/5 text-primary"
              >
                Select Categories
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
                What are you looking for?
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Choose one or more services to find tailored professionals
              </p>
            </div>

            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a service or skill..."
                className="h-14 rounded-2xl border-border/60 bg-background/50 backdrop-blur-md pl-12 pr-4 shadow-sm transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary text-base"
              />
            </div>
          </div>
        </MoveUpward>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredCategories.map((category, index) => {
            const isSelected = selectedCategories?.includes(category);
            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.03,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryToggle(category);
                }}
                className={cn(
                  'group relative flex flex-col items-center justify-center w-full cursor-pointer rounded-2xl border p-4 min-h-18 text-center transition-all duration-200 select-none',
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                    : 'border-border/60 bg-background/60 hover:bg-background hover:border-primary/40 hover:shadow-sm',
                )}
              >
                <div
                  className={cn(
                    'absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border transition-all',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground scale-100'
                      : 'border-border/60 opacity-0 group-hover:opacity-100 scale-90',
                  )}
                >
                  <Check className="size-3 stroke-[3]" />
                </div>

                <h3
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    isSelected ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {category}
                </h3>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
        <div className="flex items-center justify-between p-2 pl-4 rounded-2xl bg-background/90 dark:bg-neutral-800 backdrop-blur-xl border border-border/60 shadow-2xl">
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium">
            {selectedCategories.length > 0 ? (
              <>
                <Badge className="bg-primary text-primary-foreground font-bold rounded-lg px-2 py-0.5">
                  {selectedCategories.length}
                </Badge>
                <span className="text-foreground font-semibold">
                  {selectedCategories.length === 1 ? 'category selected' : 'categories selected'}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="size-4 text-muted-foreground" />
                Select categories or skip to browse all
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => goTo(redirectPaths.SERVICE_PROVIDERS)}
              className="rounded-xl text-xs sm:text-sm font-medium hover:bg-muted"
            >
              Skip
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              className="rounded-xl px-5 gap-1.5 font-semibold text-xs sm:text-sm shadow-md transition-all hover:gap-2"
            >
              <span>{selectedCategories.length > 0 ? 'Continue' : 'Browse All'}</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectService;
