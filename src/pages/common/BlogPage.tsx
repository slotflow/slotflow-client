import { useEffect, useState } from "react";
import BlogCTA from "@/components/blog/BlogCTA";
import LoadingFallback from "./LoadingFallback";
import BlogHero from "@/components/blog/BlogHero";
import { useDispatch, useSelector } from "react-redux";
import MoveUpward from "@/components/animation/MoveUpward";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import BlogEditorsPicks from "@/components/blog/BlogEditorsPicks";
import { getArticles, getCategories } from "@/shared/apis/contentful";
import BlogLatestInsights from "@/components/blog/BlogLatestInsights";
import BlogFeaturedArticles from "@/components/blog/BlogFeaturedArticles";
import { setArticleCategories, setArticles } from "@/shared/redux/slices/appSlice";

const BlogPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);
    const { articles, articleCategories } = useSelector((state: RootState) => state.app);

    useEffect(() => {

        if (articles.length && articleCategories.length) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const [articles, categories] = await Promise.all([
                    getArticles(),
                    getCategories(),
                ]);

                console.log("articles : ", articles)
                console.log("categories : ", categories);

                if (!articles.length && !categories.length) {
                    return;
                }

                dispatch(setArticles(articles));
                dispatch(setArticleCategories(categories));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <LoadingFallback />
        );
    }

    return (
        <main className="min-h-screen">
            <MoveUpward>
                <BlogHero
                    articlesCount={articles.length}
                    categories={articleCategories}
                    categoriesCount={articleCategories?.length}
                    featuredArticle={articles[0]}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogFeaturedArticles
                    featuredArticles={articles.slice(0, 4)}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogLatestInsights
                    articles={articles}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogEditorsPicks
                    handPickedArticles={articles.slice(5, 9)}
                />
            </MoveUpward>
            <MoveUpward>
                <BlogCTA />
            </MoveUpward>
            <MoveUpward>
                <BlogNewsletter />
            </MoveUpward>
        </main>
    );
}

export default BlogPage;


