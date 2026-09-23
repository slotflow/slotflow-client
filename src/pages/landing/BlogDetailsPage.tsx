import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '@/app/store/appStore';
import LoadingFallbackPage from '../fallbacks/LoadingFallbackPage';
import MoveUpward from '@/components/animation/MoveUpward';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogDetailHero from '@/components/blog/details/BlogDetailHero';
import BlogDetailQuote from '@/components/blog/details/BlogDetailQuote';
import BlogDetailArticle from '@/components/blog/details/BlogDetailArticle';
import BlogDetailRelatedArticles from '@/components/blog/details/BlogDetailRelatedArticles';
import BlogDetailPrevOrNextArticle from '@/components/blog/details/BlogDetailPrevOrNextArticle';

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const blogData = useSelector((state: RootState) => state.cms.blogData);
  const articles = blogData?.articles ?? [];
  const isLoading = blogData?.loadingArticles ?? true;

  const currentIndex = articles.findIndex((item) => item.id === Number(blogId));
  const article = currentIndex !== -1 ? articles[currentIndex] : null;
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Loading state handling
  if (isLoading || !article) {
    return <LoadingFallbackPage />;
  }

  return (
    <main className="min-h-screen w-full">
      <BlogDetailHero
        author={article?.author}
        category={article?.category}
        createdAt={article?.createdAt}
        description={article?.heroDescription}
        heroBackground={article?.heroBackground}
        readTime={article?.readTime}
        title={article?.heroTitle}
      />
      <BlogDetailArticle article={article} />
      <MoveUpward>
        <BlogDetailQuote />
      </MoveUpward>
      <MoveUpward>
        <BlogDetailPrevOrNextArticle nextArticle={nextArticle} prevArticle={prevArticle} />
      </MoveUpward>
      <MoveUpward>
        <BlogDetailRelatedArticles relatedArticles={articles.slice(-3)} />
      </MoveUpward>
      <MoveUpward>
        <BlogNewsletter />
      </MoveUpward>
    </main>
  );
};

export default BlogDetailsPage;
