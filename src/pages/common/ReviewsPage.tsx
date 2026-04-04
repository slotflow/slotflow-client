import React from "react";
import { toast } from "react-toastify";
import { appConfig } from "@/utils/env";
import { ArrowDown } from "lucide-react";
import { useSelector } from "react-redux";
import { Role } from "@/utils/interface/enums";
import { Button } from "@/components/ui/button";
import { RootState } from "@/utils/redux/appStore";
import { fetchReviews } from "@/utils/apis/review";
import ReviewCard from "@/components/review/ReviewCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useReviewActions } from "@/hooks/useReviewActions";
import DataFetchingError from "@/components/error/DataFetchingError";
import ConfirmDeleteAlert from "@/components/alert/ConfirmDeleteAlert";
import { ApiPaginatedResponse } from "@/utils/interface/commonInterface";
import ReviewCardsShimmer from "@/components/shimmers/ReviewCardsShimmer";
import { FetchReviewsResponse, ToggleReviewBlockStatusRequest } from "@/utils/interface/api/review";

interface ReviewsPageProps {
  isPage?: boolean;
  providerId?: string;
  userId?: string;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({
  isPage = true,
  providerId,
  userId
}) => {

  const limit = 10;
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { reportReviewHandler, toggleBlockStatusHandler, deleteReviewHandler } = useReviewActions();

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

  const handleChangeReviewBlockStatus = async (
    e: React.MouseEvent<HTMLButtonElement>,
    data: ToggleReviewBlockStatusRequest
  ) => {
    e.preventDefault();

    if (!data.reviewId) {
      toast.error("Please try again later");
      return;
    }

    try {
      const res = await toggleBlockStatusHandler(data);

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Review block status updating failed", error);
      }
      toast.error("Review block status updating failed");
    }
  };

  const handleReportReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: string
  ) => {
    e.preventDefault();

    if (!reviewId) {
      toast.error("Please try again later");
      return;
    }

    try {
      const res = await reportReviewHandler(reviewId);

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Review reporting failed", error);
      }
      toast.error("Review reporting failed");
    }
  };

  const handleDeleteReview = (
    e: React.MouseEvent<HTMLButtonElement>,
    reviewId: string
  ) => {
    e.preventDefault();

    if (!reviewId) {
      toast.error("Please try again later");
      return;
    }

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

  const reviews = data?.pages.flatMap((page) => (page.data ? page.data : [])) || [];

  return (
    <div className={`h-full ${isPage ? "p-2" : "mt-2 md:mt-0"}`}>

      {isLoading && (
        <ReviewCardsShimmer />
      )}

      {isError && (
        <DataFetchingError message="Data fetching error" />
      )}

      {reviews.length === 0 && (
        <DataFetchingError message="No Reviews found in database" className="p-4" />
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
