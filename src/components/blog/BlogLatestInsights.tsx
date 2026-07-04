import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formateDate } from "@/shared/helper/formatter";
import { BlogArticle } from "@/shared/interface/commonInterface";

interface BlogLatestInsightsProps {
    articles: BlogArticle[];
}

const BlogLatestInsights: React.FC<BlogLatestInsightsProps> = ({
    articles,
}) => {

    const [showFull, setShowFull] = useState<boolean>(false);

    return (
        <section className="container mx-auto max-w-7xl px-6 py-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <Badge variant="outline">
                        Latest Insights
                    </Badge>

                    <h2 className="mt-4 text-4xl font-bold">
                        Learn Something New Today
                    </h2>

                    <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
                        Explore practical guides, industry trends, productivity
                        tips, and feature updates to help you manage appointments
                        more efficiently.
                    </p>
                </div>

                <Button variant="outline">
                    View All Articles
                </Button>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {articles.slice(0,showFull ? articles.length : 6).map((article) => (
                    <Card
                        key={article.id}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={article.heroBackground}
                                alt={article.heroTitle}
                                className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                            />

                            <Badge className="absolute left-5 top-5">
                                {article.category}
                            </Badge>
                        </div>

                        <div className="flex flex-1 flex-col p-7">
                            <div className="space-y-5">
                                <Link to={`/blog/${article.id}`} className="hover:underline line-clamp-2 text-2xl font-bold leading-snug transition-colors group-hover:text-primary">
                                    {article.heroTitle}
                                </Link>

                                <p className="line-clamp-3 leading-7 text-muted-foreground">
                                    {article.heroDescription}
                                </p>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t pt-5">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={article.author?.profileImage}
                                        alt={article.author?.author}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <h4 className="text-sm font-semibold">
                                            {article.author?.author}
                                        </h4>

                                        <p className="text-xs text-muted-foreground">
                                            {formateDate(
                                                new Date(article.createdAt)
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <Badge variant="secondary">
                                    {article.readTime}
                                </Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <Button
                    size="lg"
                    className="rounded-full px-10"
                    onClick={() => setShowFull(!showFull)}
                >
                    {showFull ? "See less" : "Load more articles"}
                </Button>
            </div>
        </section>
    );
};

export default BlogLatestInsights;