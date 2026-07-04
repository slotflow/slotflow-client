import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BlogArticle } from "@/shared/interface/commonInterface";

interface BlogEditorsPicksProps {
    handPickedArticles: BlogArticle[];
}

const BlogEditorsPicks: React.FC<BlogEditorsPicksProps> = ({
    handPickedArticles
}) => {

    const navigate = useNavigate();

    return (
        <section className="container mx-auto px-6 py-24 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <Badge variant="outline">
                        Editor's Picks
                    </Badge>
                    <h2 className="mt-4 text-4xl font-bold">
                        Handpicked Reads
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                        Our favorite articles to help appointment-based businesses
                        improve efficiency, delight customers, and grow sustainably.
                    </p>
                </div>
            </div>
            <div className="mt-14 space-y-6">
                {handPickedArticles.map((article, index) => (
                    <Card
                        key={article.id}
                        className="group cursor-pointer rounded-3xl transition-all duration-300 hover:border-primary hover:shadow-lg"
                    >
                        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
                            <h2 className="text-5xl font-black text-muted-foreground/30 transition group-hover:text-primary">
                                {index + 1}
                            </h2>
                            <div className="flex-1">
                                <Badge variant="secondary">
                                    {article.category}
                                </Badge>
                                <h3>
                                    <Link to={`/blog/${article.id}`} className="hover:underline mt-3 text-2xl font-bold transition group-hover:text-primary">
                                        {article.heroTitle}
                                    </Link>
                                </h3>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-sm text-muted-foreground">
                                    {article.readTime}
                                </span>
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(`/blog/${article.id}`)}
                                >
                                    Read →
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default BlogEditorsPicks;