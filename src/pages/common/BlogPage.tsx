import {
    BlogArticle,
    ContentfulEntry,
    BlogAuthorFields,
    BlogCategoryFields,
    ContentfulResponse,
    ContentfulBlogArticleFields,
} from "@/shared/interface/commonInterface";
import { useEffect, useState } from "react";
import BlogCTA from "@/components/blog/BlogCTA";
import LoadingFallback from "./LoadingFallback";
import BlogHero from "@/components/blog/BlogHero";
import { contentfulAxiosInstance } from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import MoveUpward from "@/components/animation/MoveUpward";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import ReadingProgress from "@/components/scroll/ReadingProgress";
import BlogEditorsPicks from "@/components/blog/BlogEditorsPicks";
import BlogLatestInsights from "@/components/blog/BlogLatestInsights";
import BlogFeaturedArticles from "@/components/blog/BlogFeaturedArticles";
import { setArticleCategories, setArticles } from "@/shared/redux/slices/appSlice";

const BlogPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);
    const { articles, articleCategories } = useSelector((state: RootState) => state.app);

    const getCategories = async (): Promise<string[]> => {
        const { data } = await contentfulAxiosInstance.get<ContentfulResponse<BlogCategoryFields>>("/entries", {
            params: {
                content_type: "blogCategory",
            },
        });

        return data.items.map((category) => category.fields.name);
    };

    const getArticles = async (): Promise<BlogArticle[]> => {
        const { data } = await contentfulAxiosInstance.get<
            ContentfulResponse<ContentfulBlogArticleFields, BlogCategoryFields | BlogAuthorFields>
        >("/entries", {
            params: {
                content_type: "article",
                include: 1,
            },
        });

        const entryMap = new Map<string, ContentfulEntry<BlogCategoryFields | BlogAuthorFields>>(
            (data.includes?.Entry ?? []).map((entry) => [entry.sys.id, entry])
        );

        return data.items.map((article) => {
            const categoryEntry = article.fields.category
                ? entryMap.get(article.fields.category.sys.id)
                : undefined;
            const authorEntry = article.fields.author
                ? entryMap.get(article.fields.author.sys.id)
                : undefined;

            const categoryName = categoryEntry && "name" in categoryEntry.fields
                ? categoryEntry.fields.name
                : null;

            const author = authorEntry && "author" in authorEntry.fields && "proffession" in authorEntry.fields && "profileImage" in authorEntry.fields
                ? {
                    author: authorEntry.fields.author,
                    proffession: authorEntry.fields.proffession,
                    profileImage: authorEntry.fields.profileImage,
                }
                : null;

            return {
                id: article.fields.id,
                category: categoryName,
                heroBackground: article.fields.heroBackground ?? "",
                heroTitle: article.fields.heroTitle ?? "",
                heroDescription: article.fields.heroDescription ?? "",
                author,
                createdAt: article.fields.createdAt ?? "",
                readTime: article.fields.readTime ?? "",
                articleTitle: article.fields.articleTitle,
                articleImage: article.fields.articleImage ?? "",
                articleImageDescription: article.fields.articleImageDescription ?? "",
                introduction: article.fields.introduction ?? "",
                protip: article.fields.protip ?? "",
                paraOneTitle: article.fields.paraOneTitle ?? "",
                paraOneContent: article.fields.paraOneContent ?? "",
                paraTwoTitle: article.fields.paraTwoTitle ?? "",
                paraTwoContent: article.fields.paraTwoContent ?? "",
                listTitle: article.fields.listTitle ?? "",
                listContent: article.fields.listContent ?? [],
                quote: article.fields.quote ?? "",
                conclusion: article.fields.conclusion ?? "",
            } satisfies BlogArticle;
        });
    };

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

                console.log("articles : ",articles)
                console.log("categories : ",categories);

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
        <main className="min-h-screen bg-background">
            <ReadingProgress />
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
                    handPickedArticles={articles.slice(5,9)}
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


