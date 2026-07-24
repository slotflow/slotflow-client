import {
    FaqFields,
    ReviewFields,
    ContentfulResponse,
    BlogArticle,
    ContentfulBlogArticleFields,
    BlogCategoryFields,
    BlogAuthorFields,
    ContentfulEntry,
} from "@/shared/interface/commonInterface";
import { contentfulAxiosInstance } from "@/lib/axios";
import { GetFaqsParams, GetFaqsResponse } from "../interface/api/contentful";

// get faqs
export const getFaqs = async ({
    limit = 20,
    skip = 0,
    category,
}: GetFaqsParams = {}): Promise<GetFaqsResponse> => {

    const params: Record<string, unknown> = {
        content_type: "faq",
        limit,
        skip,
    };

    if (category) {
        params["fields.value"] = category;
    }

    const { data } =
        await contentfulAxiosInstance.get<
            ContentfulResponse<FaqFields>
        >("/entries", {
            params,
        });

    return {
        total: data.total,
        faqs: data.items.map((faq) => ({
            ...faq.fields,
        })),
    };
};

// get reviews
export const getReviews = async (): Promise<ReviewFields[]> => {
    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<ReviewFields>>("/entries", {
        params: {
            content_type: "review",
        },
    });

    return data.items.map((review) => review.fields);
};

// get article categories
export const getCategories = async (): Promise<string[]> => {
    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<BlogCategoryFields>>("/entries", {
        params: {
            content_type: "blogCategory",
        },
    });

    return data.items.map((category) => category.fields.name);
};

export const getArticles = async (): Promise<BlogArticle[]> => {
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