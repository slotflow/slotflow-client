import { createSlice } from '@reduxjs/toolkit';
import { CmsState } from '@/shared/types/slice';
import {
  getArticles,
  getCategories,
  getFaqs,
  getPlans,
  getReviews,
} from '@/services/apis/contentful';

const initialState: CmsState = {
  planData: null,
  blogData: null,
  reviewsData: null,
  faqData: null,
};

const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.planData = {
          plans: state.planData?.plans || [],
          total: state.planData?.total || 0,
          loading: true,
          error: null,
        };
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.planData = {
          plans: action.payload.plans,
          total: action.payload.total,
          loading: false,
          error: null,
        };
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.planData = {
          plans: state.planData?.plans || [],
          total: state.planData?.total || 0,
          loading: false,
          error: action.error.message || 'Failed to fetch plans',
        };
      })

      .addCase(getCategories.pending, (state) => {
        state.blogData = {
          articles: state.blogData?.articles || [],
          articleCategories: state.blogData?.articleCategories || [],
          loadingArticles: state.blogData?.loadingArticles || false,
          loadingCategories: true,
          errorArticles: state.blogData?.errorArticles || null,
          errorCategories: null,
        };
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        if (state.blogData) {
          state.blogData.articleCategories = action.payload;
          state.blogData.loadingCategories = false;
          state.blogData.errorCategories = null;
        }
      })
      .addCase(getCategories.rejected, (state, action) => {
        if (state.blogData) {
          state.blogData.loadingCategories = false;
          state.blogData.errorCategories = action.error.message || 'Failed to fetch categories';
        }
      })

      .addCase(getArticles.pending, (state) => {
        state.blogData = {
          articles: state.blogData?.articles || [],
          articleCategories: state.blogData?.articleCategories || [],
          loadingArticles: true,
          loadingCategories: state.blogData?.loadingCategories || false,
          errorArticles: null,
          errorCategories: state.blogData?.errorCategories || null,
        };
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        if (state.blogData) {
          state.blogData.articles = action.payload;
          state.blogData.loadingArticles = false;
          state.blogData.errorArticles = null;
        }
      })
      .addCase(getArticles.rejected, (state, action) => {
        if (state.blogData) {
          state.blogData.loadingArticles = false;
          state.blogData.errorArticles = action.error.message || 'Failed to fetch articles';
        }
      })

      .addCase(getReviews.pending, (state) => {
        state.reviewsData = {
          reviews: state.reviewsData?.reviews || [],
          total: state.reviewsData?.total || 0,
          loading: true,
          error: null,
        };
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviewsData = {
          reviews: action.payload.reviews,
          total: action.payload.total,
          loading: false,
          error: null,
        };
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.reviewsData = {
          reviews: state.reviewsData?.reviews || [],
          total: state.reviewsData?.total || 0,
          loading: false,
          error: action.error.message || 'Failed to fetch reviews',
        };
      })

      .addCase(getFaqs.pending, (state) => {
        state.faqData = {
          faqs: state.faqData?.faqs || [],
          total: state.faqData?.total || 0,
          loading: true,
          error: null,
        };
      })
      .addCase(getFaqs.fulfilled, (state, action) => {
        const existingFaqs = state.faqData?.faqs || [];
        const incomingFaqs = action.payload.faqs;

        const uniqueFaqs = [
          ...existingFaqs,
          ...incomingFaqs.filter(
            (newFaq) => !existingFaqs.some((existing) => existing.question === newFaq.question),
          ),
        ];

        state.faqData = {
          faqs: uniqueFaqs,
          total: action.payload.total,
          loading: false,
          error: null,
        };
      })
      .addCase(getFaqs.rejected, (state, action) => {
        state.faqData = {
          faqs: state.faqData?.faqs || [],
          total: state.faqData?.total || 0,
          loading: false,
          error: (action.payload as string) || action.error.message || 'Failed to fetch FAQs',
        };
      });
  },
});

export default cmsSlice.reducer;
