import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogArticle } from "@/shared/interface/commonInterface";
import React from "react";
import { formateDate } from "@/shared/helper/formatter";
import { Link } from "react-router-dom";

interface BlogFeaturedArticlesProps {
    featuredArticles: BlogArticle[];
}

const BlogFeaturedArticles: React.FC<BlogFeaturedArticlesProps> = ({
    featuredArticles
}) => {

    return (
        <section className="container mx-auto px-6 py-24 max-w-7xl mx-auto">
            <div className="mb-14 flex items-center justify-between">
                <div>
                    <Badge variant="outline" className="mb-3">
                        Featured
                    </Badge>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Featured Articles
                    </h2>
                    <p className="mt-3 max-w-2xl text-muted-foreground">
                        Discover expert insights, practical guides, and business
                        strategies to help appointment-based businesses grow.
                    </p>
                </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
                <Card className="group overflow-hidden rounded-3xl lg:col-span-2">
                    <div className="overflow-hidden">
                        <img
                            src={featuredArticles[0].articleImage}
                            className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                    </div>
                    <div className="space-y-5 p-8">
                        <div className="flex gap-3">
                            <Badge>{featuredArticles[0].category}</Badge>
                            <Badge variant="secondary">
                                Editor's Pick
                            </Badge>
                        </div>
                        <Link to={`/blog/${featuredArticles[0]?.id}`} className="hover:underline text-4xl font-bold leading-tight transition group-hover:text-primary">
                            {featuredArticles[0].heroTitle}
                        </Link>
                        <p className="leading-8 text-muted-foreground mt-4">
                            {featuredArticles[0].heroDescription}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src={featuredArticles[0].author?.profileImage}
                                    className="h-11 w-11 rounded-full"
                                />
                                <div>
                                    <h4 className="font-semibold">
                                        {featuredArticles[0].author?.author}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {featuredArticles[0].author?.proffession}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                                <p>{formateDate(new Date(featuredArticles[0].createdAt))}</p>
                                <p>{featuredArticles[0].readTime}</p>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="space-y-6">
                    {featuredArticles.slice(1, 4).map((article) => (
                        <Card
                            key={article.articleTitle}
                            className="group overflow-hidden rounded-2xl"
                        >
                            <div className="flex">
                                <img
                                    src={article.articleImage}
                                    className="h-36 w-36 object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div className="space-y-4">
                                        <Badge variant="secondary">
                                            {article.category}
                                        </Badge>

                                        <Link
                                            to={`/blog/${article.id}`}
                                            className="hover:underline line-clamp-2 text-lg font-semibold leading-snug transition-colors hover:text-primary"
                                        >
                                            {article.articleTitle}
                                        </Link>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                                        <span>{article.readTime}</span>

                                        <Link
                                            to={`/blog/${article.id}`}
                                            className="font-medium transition-colors hover:text-primary"
                                        >
                                            Read →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogFeaturedArticles;