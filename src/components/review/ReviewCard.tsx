import { Button } from '../ui/button';
import { Role } from '@/shared/types/enums';
import StatusBadge from '../common/StatusBadge';
import ReviewUserProfile from './ReviewUserProfile';
import { ReviewCardProps } from '@/shared/types/component';
import noProfile from '../../assets/defaultImages/avatar.png';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, ShieldAlert, ShieldBan, ShieldCheck, ShieldX, Trash } from 'lucide-react';

const ReviewCard = ({
  review,
  role,
  handleDeleteReview,
  handleReportReview,
  handleChangeReviewBlockStatus,
  isChangingBlockStatus,
  isChangingReportStatus,
}: ReviewCardProps) => {
  return (
    <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-col gap-1 pb-2">
        <CardTitle className="text-lg font-semibold">⭐ {review.rating}</CardTitle>
        <span className="text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </CardHeader>

      <CardContent className="flex flex-col h-full pt-0">
        <p className="mb-4 text-sm leading-relaxed">{review.reviewText}</p>

        <div className="flex-grow" />

        {role !== Role.PROVIDER && (
          <ReviewUserProfile
            profileImage={review?.providerId?.profileImage ?? noProfile}
            username={review?.providerId?.username ?? 'No username'}
            text="Service Provider"
          />
        )}

        {role !== Role.USER && (
          <ReviewUserProfile
            profileImage={review?.userId?.profileImage ?? noProfile}
            username={review?.userId?.username ?? 'No username'}
            text="Reviewer"
          />
        )}

        {role !== Role.USER && (
          <div className="grid grid-cols-2 gap-4 mt-4 border-t pt-4">
            <div className="flex items-center">
              {isChangingReportStatus ? (
                <StatusBadge type="updating" />
              ) : review.reported ? (
                <StatusBadge
                  label="Reported"
                  type="unverified"
                  icon={<ShieldX className="w-3.5 h-3.5" />}
                />
              ) : (
                <StatusBadge
                  label="Not Reported"
                  type="verified"
                  icon={<ShieldCheck className="w-3.5 h-3.5" />}
                />
              )}
            </div>

            <div className="flex items-center">
              {isChangingBlockStatus ? (
                <StatusBadge type="updating" />
              ) : review.isBlocked ? (
                <StatusBadge type="blocked" />
              ) : (
                <StatusBadge type="active" />
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
              onClick={() => handleDeleteReview(review._id)}
            >
              <Trash className="w-3.5 h-3.5 mr-1 text-red-500" /> Delete
            </Button>
          )}

          {role === Role.PROVIDER && (
            <Button
              title={review.reported ? 'Unreport' : 'Report'}
              variant="default"
              size="sm"
              className="cursor-pointer"
              onClick={() => handleReportReview(review._id)}
            >
              {isChangingReportStatus ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  Updating...
                </>
              ) : review.reported ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-600" />
                  Unreport
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                  Report
                </>
              )}
            </Button>
          )}

          {role === Role.ADMIN && (
            <Button
              title={review.isBlocked ? 'Unblock' : 'Block'}
              variant="secondary"
              size="sm"
              className="cursor-pointer"
              onClick={() =>
                handleChangeReviewBlockStatus({
                  reviewId: review._id,
                  isBlocked: review.isBlocked,
                })
              }
            >
              {isChangingBlockStatus ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  Updating...
                </>
              ) : review.isBlocked ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-green-600" />
                  Unblock
                </>
              ) : (
                <>
                  <ShieldBan className="w-3.5 h-3.5 mr-1 text-red-500" />
                  Block
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
