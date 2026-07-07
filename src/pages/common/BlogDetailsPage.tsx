import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "@/shared/redux/appStore";
import MoveUpward from "@/components/animation/MoveUpward";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { BlogArticle } from "@/shared/interface/commonInterface";
import ReadingProgress from "@/components/scroll/ReadingProgress";
import BlogDetailHero from "@/components/blog/details/BlogDetailHero";
import BlogDetailQuote from "@/components/blog/details/BlogDetailQuote";
import BlogDetailArticle from "@/components/blog/details/BlogDetailArticle";
import BlogDetailRelatedArticles from "@/components/blog/details/BlogDetailRelatedArticles";
import BlogDetailPrevOrNextArticle from "@/components/blog/details/BlogDetailPrevOrNextArticle";

const BlogDetailsPage = () => {

    const { blogId } = useParams();
    const { articles } = useSelector((state: RootState) => state.app);
    const [article, setArticle] = useState<BlogArticle>(articles[0]);
    const [prevArticle, setPrevArticle] = useState<BlogArticle | null>(null);
    const [nextArticle, setNextArticle] = useState<BlogArticle | null>(articles[1])

    useEffect(() => {
        if (!blogId || !articles) return;
        const currentIndex = articles.findIndex(
            article => article.id === Number(blogId)
        );

        if (currentIndex === -1) return;

        setArticle(articles[currentIndex]);
        setPrevArticle(currentIndex > 0 ? articles[currentIndex - 1] : null);
        setNextArticle(
            currentIndex < articles.length - 1
                ? articles[currentIndex + 1]
                : null
        );
    }, [blogId, articles]);

    return (
        <main className="min-h-screen bg-[var(--background)]">
            <ReadingProgress />
            <BlogDetailHero
                author={article?.author}
                category={article.category}
                createdAt={article?.createdAt}
                description={article?.heroDescription}
                heroBackground={article?.heroBackground}
                readTime={article?.readTime}
                title={article?.heroTitle}
            />
            <BlogDetailArticle
                article={article}
            />
            <MoveUpward>
                <BlogDetailQuote />
            </MoveUpward>
            <MoveUpward>
                <BlogDetailPrevOrNextArticle
                    nextArticle={nextArticle}
                    prevArticle={prevArticle}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogDetailRelatedArticles 
                    relatedArticles={articles.slice(-3)}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogNewsletter />
            </MoveUpward>
        </main>
    );
}

export default BlogDetailsPage;