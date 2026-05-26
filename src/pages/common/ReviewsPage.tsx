import React from "react";
import { toast } from "react-toastify";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useReview } from "@/hooks/useReview";
import { Role } from "@/shared/interface/enums";
import { Button } from "@/components/ui/button";
import NoData from "@/components/common/NoData";
import { RootState } from "@/shared/redux/appStore";
import { fetchReviews } from "@/shared/apis/review";
import ReviewCard from "@/components/review/ReviewCard";
import PageHeader from "@/components/common/PageHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import DataFetchingError from "@/components/error/DataFetchingError";
import ConfirmDeleteAlert from "@/components/alert/ConfirmDeleteAlert";
import { ReviewsPageProps } from "@/shared/interface/componentInterface";
import ReviewCardsShimmer from "@/components/shimmers/ReviewCardsShimmer";
import { ApiPaginatedResponse } from "@/shared/interface/commonInterface";
import { Review } from "@/shared/interface/entityInterface/reviewInterface";
import { FetchReviewsResponse, ToggleReviewBlockStatusRequest } from "@/shared/interface/api/review";

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  isPage = true,
  providerId,
  userId
}) => {

  const limit = 10;
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { reportReviewHandler, toggleBlockStatusHandler, deleteReviewHandler } = useReview();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ApiPaginatedResponse<FetchReviewsResponse>>({
    queryKey: ["reviews"],
    queryFn: ({ pageParam = 1, ...queryParams }) =>
      fetchReviews({ ...queryParams, page: pageParam as number, limit, providerId, userId }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.currentPage || !lastPage.totalPages) return undefined;
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const handleChangeReviewBlockStatus = async (e: React.MouseEvent<HTMLButtonElement>, data: ToggleReviewBlockStatusRequest) => {
    e.preventDefault();
    const res = await toggleBlockStatusHandler(data);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleReportReview = async (e: React.MouseEvent<HTMLButtonElement>, reviewId: Review["_id"]) => {
    e.preventDefault();
    const res = await reportReviewHandler(reviewId);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteReview = (e: React.MouseEvent<HTMLButtonElement>, reviewId: Review["_id"]) => {
    e.preventDefault();
    toast(({ closeToast }) => (
      <ConfirmDeleteAlert
        message="Are you sure you want to delete this review?"
        reviewId={reviewId}
        deleteReviewHandler={deleteReviewHandler}
        closeToast={closeToast}
        errorMessage="Review deleting failed"
        successMessage="Review deleted successfully"
      />
    ), { autoClose: false });
  };

  const reviews = data?.pages.flatMap((page) => (page.items ? page.items : [])) || [];

  return (
    <div className={`${isPage ? "container p-4 space-y-6" : "mt-2 md:mt-0"}`}>
      {isPage && (
        <PageHeader
          title="Reviews"
          description="Manage your reviews."
        />
      )}

      {isLoading && (
        <ReviewCardsShimmer />
      )}

      {isError && (
        <DataFetchingError message="Data fetching error" />
      )}

      {reviews.length === 0 && (
        <NoData message="No Reviews found in database"  />
      )}

      {!isLoading && !isError && reviews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              role={authUser?.role as Role}
              handleDeleteReview={handleDeleteReview}
              handleReportReview={handleReportReview}
              handleChangeReviewBlockStatus={handleChangeReviewBlockStatus}
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
            {isFetchingNextPage ? "Loading..." : "Load More"} <ArrowDown />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
