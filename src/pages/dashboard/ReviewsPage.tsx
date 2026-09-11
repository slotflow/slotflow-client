import { toast } from 'react-toastify';
import { ArrowDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Role } from '@/shared/types/enums';
import { useReview } from '@/hooks/useReview';
import { Button } from '@/components/ui/button';
import NoData from '@/components/common/NoData';
import { RootState } from '@/app/store/appStore';
import { queryKeys } from '@/shared/utils/constants';
import { Review } from '@/shared/types/entity/review';
import { fetchReviews } from '@/services/apis/review';
import ReviewCard from '@/components/review/ReviewCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import ConfirmAlert from '@/components/alert/ConfirmAlert';
import { ReviewsPageProps } from '@/shared/types/component';
import { ApiPaginatedResponse } from '@/shared/types/common';
import { FetchReviewsResponse } from '@/shared/types/api/review';
import DataFetchingError from '@/components/error/DataFetchingError';
import ReviewCardsShimmer from '@/components/shimmers/ReviewCardsShimmer';

const ReviewsPage = ({ isPage = true, providerId, userId }: ReviewsPageProps) => {
  const limit = 10;
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { reportReview, changeReviewBlockStatus, deleteReview, isDeleting, isChangingBlockStatus, isChangingReportStatus } = useReview();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery<ApiPaginatedResponse<FetchReviewsResponse>>({
      queryKey: [queryKeys.REVIEWS],
      queryFn: ({ pageParam = 1, ...queryParams }) =>
        fetchReviews({ ...queryParams, page: pageParam as number, limit, providerId, userId }),
      getNextPageParam: (lastPage) => {
        if (!lastPage.currentPage || !lastPage.totalPages) return undefined;
        return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const handleDeleteReview = (reviewId: Review['_id']) => {
    toast(
      ({ closeToast }) => (
        <ConfirmAlert
          message="Are you sure you want to delete this review?"
          deleteHandler={(options) => deleteReview({ reviewId }, options)}
          isDeleting={isDeleting}
          closeToast={closeToast}
          btnTitle="Delete review button"
          btnText="Delete"
        />
      ),
      { autoClose: false },
    );
  };

  const reviews = data?.pages.flatMap((page) => (page.items ? page.items : [])) || [];

  return (
    <div className={`${isPage ? 'container p-4 space-y-6' : 'mt-2 md:mt-0'}`}>
      {isLoading && <ReviewCardsShimmer />}

      {isError && <DataFetchingError message="Data fetching error" />}

      {reviews.length === 0 && <NoData message="No Reviews found in database" />}

      {!isLoading && !isError && reviews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              role={authUser?.role as Role}
              handleDeleteReview={() => handleDeleteReview(review._id)}
              handleReportReview={() => reportReview({ reviewId: review._id })}
              handleChangeReviewBlockStatus={() => changeReviewBlockStatus({ reviewId: review._id, isBlocked: review.isBlocked })}
              isChangingBlockStatus={isChangingBlockStatus}
              isChangingReportStatus={isChangingReportStatus}
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <Button
            title="Load More"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)] mb-2"
            variant="ghost"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'} <ArrowDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
