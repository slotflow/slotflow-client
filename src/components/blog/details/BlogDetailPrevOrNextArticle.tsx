import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { BlogDetailPrevOrNextArticleProps } from "@/shared/interface/componentInterface";

const BlogDetailPrevOrNextArticle = ({
    nextArticle,
    prevArticle
}: BlogDetailPrevOrNextArticleProps) => {
    console.log("prevArticleId : ",prevArticle?.id)
    console.log("nextArticleId : ",nextArticle?.id)
    return (
        <section id="prev-or-next" className="mt-32 pt-16 w-full">
            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
                {prevArticle && (
                    <Card className="group rounded-3xl transition-all hover:-translate-y-1 hover:shadow-lg">
                        <CardContent className="p-8">
                            <p className="mb-3 text-sm text-muted-foreground">
                                Previous Article
                            </p>
                            <Link
                                to={`/blog/${prevArticle?.id}`}
                                title={prevArticle?.heroTitle}
                                className="hover:underline block text-2xl font-bold leading-tight transition-colors hover:text-primary line-clamp-2"
                            >
                                {prevArticle ? prevArticle.heroTitle : ""}
                            </Link>
                            <p className="line-clamp-2 mt-4 leading-7 text-muted-foreground">
                                {prevArticle ? prevArticle.heroDescription : ""}
                            </p>
                        </CardContent>
                    </Card>
                )}
                {nextArticle && (
                    <Card className="group rounded-3xl transition-all hover:-translate-y-1 hover:shadow-lg">
                        <CardContent className="p-8">
                            <p className="mb-3 text-sm text-muted-foreground">
                                Next Article
                            </p>
                            <Link
                                to={`/blog/${nextArticle?.id}`}
                                title={nextArticle?.heroTitle}
                                className="hover:underline block text-2xl font-bold leading-tight transition-colors hover:text-primary line-clamp-2"
                            >
                                {nextArticle ? nextArticle.heroTitle : ""}
                            </Link>
                            <p className="mt-4 leading-7 text-muted-foreground">
                                {nextArticle ? nextArticle.heroDescription : ""}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    )
}

export default BlogDetailPrevOrNextArticle;