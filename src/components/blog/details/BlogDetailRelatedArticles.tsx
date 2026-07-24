import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { BlogDetailRelatedArticlesProps } from "@/shared/interface/componentInterface";

const BlogDetailRelatedArticles = ({
    relatedArticles
}: BlogDetailRelatedArticlesProps) => {
    return (
        <section id="related-articles" className="mt-32 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between">
                    <div>
                        <Badge variant="outline">
                            Continue Reading
                        </Badge>
                        <h2 className="mt-4 text-4xl font-bold">
                            Related Articles
                        </h2>
                    </div>
                </div>
                <div className="mt-12 grid gap-8 lg:grid-cols-3">
                    {relatedArticles.map((article) => (
                        <Card
                            key={article.heroTitle}
                            className="group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={article.heroBackground}
                                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <Badge variant="secondary">
                                    {article.category}
                                </Badge>
                                <h3 className="mt-4 text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                                    {article.heroTitle}
                                </h3>
                                <p className="mt-4 leading-7 text-muted-foreground">
                                    {article.heroDescription}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogDetailRelatedArticles;