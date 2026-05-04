import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/shared/config/env";
import BoardingLayout from "@/layouts/BoardingLayout";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { AuthUser } from "@/shared/interface/sliceInterface";
import { Check, Loader, TriangleAlert, X } from "lucide-react";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { providerSubmitDetailsForReview } from "@/shared/apis/providerProfile";
import { blockBackStatuses, onboardingContent, redirectPaths, verificationStatusTextMap } from "@/shared/utils/constants";

const ProviderApprovalPendingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authUser: AuthUser | null = useSelector((state: RootState) => state.auth.authUser);
  const adminStatus = authUser?.adminVerificationStatus;
  const isBackBlocked = adminStatus !== undefined && (blockBackStatuses as readonly string[]).includes(adminStatus);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isBackBlocked) return;

    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    blockNavigation();
    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, [isBackBlocked]);

  const verificationRows = [
    {
      label: "Address Verification",
      verified: authUser?.isAddressVerified,
      redirect: redirectPaths.PROVIDER_ADDRESS
    },
    {
      label: "Service Details Verification",
      verified: authUser?.isServiceDetailsVerified,
      redirect: redirectPaths.PROVIDER_SERVICE_DETAILS
    },
    {
      label: "Availability Verification",
      verified: authUser?.isAvailabilityVerified,
      redirect: redirectPaths.PROVIDER_AVAILABILITY
    },
    {
      label: "Proofs Verification",
      verified: authUser?.isProofsVerified,
      redirect: redirectPaths.PROVIDER_PROOFS
    },
  ];

  const handleSubmit = async () => {
    try {
      const res = await dispatch(providerSubmitDetailsForReview()).unwrap();
      if (!res) {
        throw new Error("Submission failed");
      } else {
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.log("Error submitting details for review:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BoardingLayout
      pageNumber={5}
      heading={onboardingContent.profileApproval.title}
      description={onboardingContent.profileApproval.description}
    >

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Overall Status</p>
            <p className="text-lg font-semibold">
              {verificationStatusTextMap[adminStatus ?? "NOT_REQUESTED"]}
            </p>
          </div>

          <div>
            {adminStatus === AdminVerificationStatus.APPROVED && <Check className="text-green-500" />}
            {adminStatus === AdminVerificationStatus.NOT_REQUESTED && <TriangleAlert className="text-yellow-500" />}
            {adminStatus === AdminVerificationStatus.REJECTED && <X className="text-red-500" />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">

          <h3 className="font-medium">Verification Progress</h3>

          <div className="space-y-3">
            {verificationRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-3">
                  {row.verified ? (
                    <Check className="text-green-500 size-4" />
                  ) : (
                    <Loader className="animate-spin text-yellow-500 size-4" />
                  )}

                  <span className="text-sm">{row.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {row.verified ? "Verified" : "Pending"}
                  </span>

                  {adminStatus === AdminVerificationStatus.REJECTED && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(row.redirect)}
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {adminStatus === AdminVerificationStatus.REJECTED && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-red-600">
              Rejection Reason
            </p>
            <p className="text-sm mt-1">
              {authUser?.verificationRejectionReason}
            </p>
          </CardContent>
        </Card>
      )}

      {(adminStatus === AdminVerificationStatus.NOT_REQUESTED ||
        adminStatus === AdminVerificationStatus.REJECTED) && (
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              <p className="text-sm text-muted-foreground max-w-md">
                {onboardingContent.profileApproval.description2}
              </p>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin size-4 mr-2" />
                    {adminStatus === AdminVerificationStatus.REJECTED
                      ? "Resubmitting..."
                      : "Submitting..."}
                  </>
                ) : (
                  adminStatus === AdminVerificationStatus.REJECTED
                    ? "Resubmit for Review"
                    : "Submit for Review"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

      {isBackBlocked && (
        <div className="text-center text-sm text-muted-foreground">
          {onboardingContent.profileApproval.description3}
        </div>
      )}
    </BoardingLayout>
  );
};

export default ProviderApprovalPendingPage;
