import {
    BookOpen,
    ArrowRight,
    CalendarDays,
} from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formateDate } from "@/shared/helper/formatter";
import SplitTextReveal from "../animation/SplitTextReveal";
import { BlogArticle } from "@/shared/interface/commonInterface";
import AnimatedCounter from "../animation/AnimatedCounter";

interface BlogHeroProps {
    categories: string[];
    articlesCount: number;
    categoriesCount: number;
    featuredArticle?: BlogArticle | null;
}

const BlogHero: React.FC<BlogHeroProps> = ({
    articlesCount,
    categories,
    categoriesCount,
    featuredArticle
}) => {
    const navigate = useNavigate();
    const featuredTitle = featuredArticle?.heroTitle ?? "Explore our latest insights";
    const featuredDescription = featuredArticle?.heroDescription ?? "Fresh articles and practical strategies for growing your business.";
    const featuredDate = featuredArticle?.createdAt ?? "";
    const featuredReadTime = featuredArticle?.readTime ?? "";

    return (
        <section className="relative overflow-hidden border-b">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
            <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="container relative mx-auto px-6 py-24 max-w-7xl mx-auto">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}
                    >

                        <SplitTextReveal
                            as="h1"
                            className="text-5xl font-black leading-tight lg:text-7xl"
                        >
                            Learn.
                            <br />
                            Grow.
                            <br />
                            Book Smarter.
                        </SplitTextReveal>
                        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-8">
                            Discover practical guides, growth strategies,
                            product updates, and expert insights to help
                            appointment-based businesses improve efficiency,
                            reduce no-shows, and delight customers.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {categories.map((item) => (
                                <Badge
                                    key={item}
                                    variant="secondary"
                                    className="cursor-pointer rounded-full px-4 py-2 transition hover:text-white"
                                >
                                    {item}
                                </Badge>
                            ))}
                        </div>
                        <div className="mt-12 flex gap-10">
                            <div>
                                <AnimatedCounter
                                    to={articlesCount}
                                    className="text-3xl font-bold"
                                />
                                <p className="text-muted-foreground">
                                    Articles
                                </p>
                            </div>
                            <div>
                                <AnimatedCounter
                                    to={categoriesCount}
                                    className="text-3xl font-bold"
                                />
                                <p className="text-muted-foreground">
                                    Categories
                                </p>
                            </div>
                            <div>
                                <AnimatedCounter
                                    to={10000}
                                    suffix="+"
                                    className="text-3xl font-bold"
                                />
                                <p className="text-muted-foreground">
                                    Monthly Readers
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: .95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: .7 }}
                    >
                        <Card className="overflow-hidden rounded-3xl border shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
                                className="h-72 w-full object-cover"
                            />
                            <div className="space-y-4 p-8">
                                <Badge>Featured Article</Badge>
                                <h2 className="text-3xl font-bold leading-tight">
                                    {featuredTitle}
                                </h2>
                                <p className="text-muted-foreground leading-7">
                                    {featuredDescription}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />
                                        {formateDate(featuredDate)}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        {featuredReadTime}
                                    </div>
                                </div>
                                <Button
                                    className="rounded-full"
                                    onClick={() => {
                                        if (featuredArticle?.id) {
                                            navigate(`/blog/${featuredArticle.id}`);
                                        }
                                    }}>
                                    Read Article
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default BlogHero;