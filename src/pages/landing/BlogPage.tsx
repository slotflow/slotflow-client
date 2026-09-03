import { useEffect } from 'react';
import { appConfig } from '@/config/env';
import BlogCTA from '@/components/blog/BlogCTA';
import BlogHero from '@/components/blog/BlogHero';
import { useDispatch, useSelector } from 'react-redux';
import LoadingFallback from '../common/LoadingFallback';
import MoveUpward from '@/components/animation/MoveUpward';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { AppDispatch, RootState } from '@/app/store/appStore';
import BlogEditorsPicks from '@/components/blog/BlogEditorsPicks';
import BlogLatestInsights from '@/components/blog/BlogLatestInsights';
import { getArticles, getCategories } from '@/services/apis/contentful';
import BlogFeaturedArticles from '@/components/blog/BlogFeaturedArticles';

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blogData = useSelector((state: RootState) => state.cms.blogData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getArticles()).unwrap(), dispatch(getCategories()).unwrap()]);
      } catch (err) {
        if (appConfig.isDevelopment) {
          console.error('Failed to load blog data:', err);
        }
      }
    };

    fetchData();
  }, [dispatch]);

  const articles = blogData?.articles ?? [];
  const articleCategories = blogData?.articleCategories ?? [];
  const loadingArticles = blogData?.loadingArticles ?? true;
  const loadingCategories = blogData?.loadingCategories ?? true;
  const isLoading = loadingArticles || loadingCategories || !blogData;

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <main className="min-h-screen w-full">
      <MoveUpward>
        <BlogHero
          articlesCount={articles.length}
          categories={articleCategories}
          categoriesCount={articleCategories?.length}
          featuredArticle={articles[0]}
        />
      </MoveUpward>
      <MoveUpward>
        <BlogFeaturedArticles featuredArticles={articles.slice(0, 4)} />
      </MoveUpward>
      <MoveUpward>
        <BlogLatestInsights articles={articles} />
      </MoveUpward>
      <MoveUpward>
        <BlogEditorsPicks handPickedArticles={articles.slice(5, 9)} />
      </MoveUpward>
      <MoveUpward>
        <BlogCTA />
      </MoveUpward>
      <MoveUpward>
        <BlogNewsletter />
      </MoveUpward>
    </main>
  );
};

export default BlogPage;
