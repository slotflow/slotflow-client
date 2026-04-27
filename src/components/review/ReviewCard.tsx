import React from "react";
import { Button } from "../ui/button";
import ReviewStatus from "./ReviewStatus";
import { Role } from "@/shared/interface/enums";
import ReviewUserProfile from "./ReviewUserProfile";
import { ShieldCheck, ShieldX, Trash } from "lucide-react";
import noProfile from '../../assets/defaultImages/avatar.png';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ReviewCardProps } from "@/shared/interface/componentInterface";

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  role,
  handleDeleteReview,
  handleReportReview,
  handleChangeReviewBlockStatus
}) => {
  return (
    <Card
      className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <CardHeader className="flex flex-col gap-1 pb-2">
        <CardTitle className="text-lg font-semibold">
          ⭐ {review.rating}
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col h-full pt-0">
        <p className="mb-4 text-sm leading-relaxed">
          {review.reviewText}
        </p>

        <div className="flex-grow" />

        {role !== Role.PROVIDER && (
          <ReviewUserProfile
            profileImage={review?.providerId?.profileImage ?? noProfile}
            username={review?.providerId?.username ?? "No username"}
            text="Service Provider"
          />
        )}

        {role !== Role.USER && (
          <ReviewUserProfile
            profileImage={review?.userId?.profileImage ?? noProfile}
            username={review?.userId?.username ?? "No username"}
            text="Reviewer"
          />
        )}

        {role !== Role.USER && (
          <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
            <div className="flex items-center">
              {review.reported ? (
                <ReviewStatus
                  status="Reported"
                  isNot
                  icon={ShieldX}
                />
              ) : (
                <ReviewStatus
                  status="Not reported"
                  icon={ShieldCheck}
                />
              )}
            </div>

            <div className="flex items-center">
              {review.isBlocked ? (
                <ReviewStatus
                  status="Blocked"
                  isNot
                  icon={ShieldX}
                />
              ) : (
                <ReviewStatus
                  status="Not Blocked"
                  icon={ShieldCheck}
                />
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          {role === Role.USER && (
            <Button
              title="Delete"
              variant="destructive"
              size="sm"
              className="cursor-pointer bg-[var(--background)] border"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDeleteReview(e, review._id)}
            >
              <Trash className="text-red-500" /> Delete
            </Button>
          )}

          {role === Role.PROVIDER && (
            <Button
              title={review.reported ? "Unreport" : "Report"}
              variant="default"
              size="sm"
              className="cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleReportReview(e, review._id)}
            >
              {review.reported ? (
                <ReviewStatus
                  status="Unreport"
                  icon={ShieldCheck}
                />
              ) : (
                <ReviewStatus
                  status="Report"
                  isNot
                  icon={ShieldX}
                />
              )}
            </Button>
          )}

          {role === Role.ADMIN && (
            <Button
              title={review.isBlocked ? "Unblock" : "Block"}
              variant="secondary"
              size="sm"
              className="cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleChangeReviewBlockStatus(e, {
                reviewId: review._id,
                isblocked: review.isBlocked
              })}
            >
              {review.isBlocked ? (
                <ReviewStatus
                  status="Unblock"
                  icon={ShieldCheck}
                />
              ) : (
                <ReviewStatus
                  status="Block"
                  icon={ShieldX}
                />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
};

export default ReviewCard;