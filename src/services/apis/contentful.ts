import {
  FaqFields,
  PlanFields,
  BlogArticle,
  ReviewFields,
  ContentfulEntry,
  BlogAuthorFields,
  ContentfulResponse,
  BlogCategoryFields,
  ContentfulBlogArticleFields,
} from '@/shared/types/common';
import { RootState } from '@/app/store/appStore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentfulAxiosInstance } from '@/lib/axios';
import { GetFaqsParams, GetFaqsResponse } from '../../shared/types/api/contentful';

// get faqs
export const getFaqs = createAsyncThunk(
  'cms/getFaqs',
  async ({ limit = 20, skip = 0, category }: GetFaqsParams = {}): Promise<GetFaqsResponse> => {
    const params: Record<string, unknown> = {
      content_type: 'faq',
      limit,
      skip,
    };

    if (category) {
      params['fields.value'] = category;
    }

    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<FaqFields>>('/entries', {
      params,
    });

    return {
      total: data.total,
      faqs: data.items.map((faq) => faq.fields),
    };
  },
  {
    condition: ({ limit = 20, skip = 0 }, { getState }) => {
      const state = getState() as RootState;
      const faqData = state.cms.faqData;

      if (faqData?.loading || (faqData?.faqs && faqData.faqs.length >= skip + limit)) {
        return false;
      }
    },
  },
);

// get reviews
export const getReviews = createAsyncThunk(
  'app/getReviews',
  async (): Promise<{ reviews: ReviewFields[]; total: number }> => {
    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<ReviewFields>>(
      '/entries',
      {
        params: {
          content_type: 'review',
        },
      },
    );

    return {
      reviews: data.items.map((review) => review.fields),
      total: data.total,
    };
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const reviewsData = state.cms.reviewsData;
      if (reviewsData && (reviewsData.reviews.length > 0 || reviewsData.loading)) {
        return false;
      }
    },
  },
);

// get article categories
export const getCategories = createAsyncThunk(
  'app/getCategories',
  async (): Promise<string[]> => {
    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<BlogCategoryFields>>(
      '/entries',
      {
        params: { content_type: 'blogCategory' },
      },
    );

    return data.items.map((category) => category.fields.name);
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const categories = state.cms.blogData?.articleCategories;
      const loading = state.cms.blogData?.loadingCategories;
      if (loading || (categories && categories.length > 0)) {
        return false;
      }
    },
  },
);

// get articles
export const getArticles = createAsyncThunk(
  'app/getArticles',
  async (): Promise<BlogArticle[]> => {
    const { data } = await contentfulAxiosInstance.get<
      ContentfulResponse<ContentfulBlogArticleFields, BlogCategoryFields | BlogAuthorFields>
    >('/entries', {
      params: { content_type: 'article', include: 1 },
    });

    const entryMap = new Map<string, ContentfulEntry<BlogCategoryFields | BlogAuthorFields>>(
      (data.includes?.Entry ?? []).map((entry) => [entry.sys.id, entry]),
    );

    return data.items.map((article) => {
      const categoryEntry = article.fields.category
        ? entryMap.get(article.fields.category.sys.id)
        : undefined;
      const authorEntry = article.fields.author
        ? entryMap.get(article.fields.author.sys.id)
        : undefined;

      const categoryName =
        categoryEntry && 'name' in categoryEntry.fields ? categoryEntry.fields.name : null;

      const author =
        authorEntry &&
        'author' in authorEntry.fields &&
        'proffession' in authorEntry.fields &&
        'profileImage' in authorEntry.fields
          ? {
              author: authorEntry.fields.author,
              proffession: authorEntry.fields.proffession,
              profileImage: authorEntry.fields.profileImage,
            }
          : null;

      return {
        id: article.fields.id,
        category: categoryName,
        heroBackground: article.fields.heroBackground ?? '',
        heroTitle: article.fields.heroTitle ?? '',
        heroDescription: article.fields.heroDescription ?? '',
        author,
        createdAt: article.fields.createdAt ?? '',
        readTime: article.fields.readTime ?? '',
        articleTitle: article.fields.articleTitle,
        articleImage: article.fields.articleImage ?? '',
        articleImageDescription: article.fields.articleImageDescription ?? '',
        introduction: article.fields.introduction ?? '',
        protip: article.fields.protip ?? '',
        paraOneTitle: article.fields.paraOneTitle ?? '',
        paraOneContent: article.fields.paraOneContent ?? '',
        paraTwoTitle: article.fields.paraTwoTitle ?? '',
        paraTwoContent: article.fields.paraTwoContent ?? '',
        listTitle: article.fields.listTitle ?? '',
        listContent: article.fields.listContent ?? [],
        quote: article.fields.quote ?? '',
        conclusion: article.fields.conclusion ?? '',
      } satisfies BlogArticle;
    });
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const articles = state.cms.blogData?.articles;
      const loading = state.cms.blogData?.loadingArticles;
      if (loading || (articles && articles.length > 0)) {
        return false;
      }
    },
  },
);

// get plans
export const getPlans = createAsyncThunk(
  'app/getPlans',
  async (): Promise<{ plans: PlanFields[]; total: number }> => {
    const params: Record<string, unknown> = { content_type: 'plan' };
    const { data } = await contentfulAxiosInstance.get<ContentfulResponse<PlanFields>>('/entries', {
      params,
    });

    return {
      total: data.total,
      plans: data.items.map((plan) => ({ ...plan.fields })),
    };
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const planData = state.cms.planData;
      if (planData && (planData.plans.length > 0 || planData.loading)) {
        return false;
      }
    },
  },
);
