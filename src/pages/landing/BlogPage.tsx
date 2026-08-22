import { useEffect, useState } from 'react';
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
import { setArticleCategories, setArticles } from '@/app/store/slices/appSlice';

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
        const [articles, categories] = await Promise.all([getArticles(), getCategories()]);

        console.log('articles : ', articles);
        console.log('categories : ', categories);

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
  }, [articleCategories.length, dispatch, articles.length]);

  if (loading) {
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
