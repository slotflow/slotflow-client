import { useEffect } from "react";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/navs/SideBox";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { AdminVerificationStatus } from "@/shared/interface/enums";
import { providerSubmitDetailsForReview } from "@/shared/apis/provider";
import { blockBackStatuses, redirectPaths, verificationStatusTextMap } from "@/shared/utils/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProviderApprovalPendingPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const adminStatus = authUser?.adminVerificationStatus;
  const isBackBlocked = adminStatus !== undefined && (blockBackStatuses as readonly string[]).includes(adminStatus);

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
    await dispatch(providerSubmitDetailsForReview()).unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        }
      })
  }

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox pageNumber={5} />

      <div className="w-full md:w-8/12 overflow-y-scroll no-scrollbar md:mt-10 px-4 md:px-12 py-6 md:py-0">
        <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Approval</h4>
        <Card className="w-full my-4">

          <CardContent className="space-y-6">

            <div className="flex space-x-4">
              <p className="text-sm font-medium">Overall Status</p>
              <p className="text-sm">
                {verificationStatusTextMap[adminStatus ?? "NOT_REQUESTED"]}
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Status</TableHead>
                  {adminStatus === AdminVerificationStatus.REJECTED && (
                    <TableHead>Update</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {verificationRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>
                      {row.verified ? "Verified" : "Pending"}
                    </TableCell>
                    {adminStatus === AdminVerificationStatus.REJECTED && (
                      <TableCell>
                        <Button
                          title="Update"
                          variant="default"
                          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                          onClick={() => navigate(row.redirect)}
                        ><Edit />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {(adminStatus === AdminVerificationStatus.NOT_REQUESTED || adminStatus === AdminVerificationStatus.REJECTED) && (
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm text-center">
                  Please submit your details. We will review them and inform you via email within one business day.
                </p>
                <Button
                  title={adminStatus === AdminVerificationStatus.NOT_REQUESTED ? "Submit for Review" : "Resubmit for Review"}
                  variant="default"
                  className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                  onClick={handleSubmit}
                >
                  {adminStatus === AdminVerificationStatus.NOT_REQUESTED ? "Submit for Review" : "Resubmit for Review"}
                </Button>
              </div>
            )}

            {adminStatus === AdminVerificationStatus.REJECTED &&
              (<div className="flex space-x-4">
                <p className="text-sm">
                  <span className="font-semibold text-red-500">Rejection Reason</span>{" "}
                  <span className="ml-4">
                    {authUser?.verificationRejectionReason}
                  </span>
                </p>
              </div>)}

            {isBackBlocked && (
              <p className="text-sm text-center flex items-center spac">
                Your details are under review. Navigation is temporarily disabled. This process may take up to 12 hours, and we will inform you through your registered email.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderApprovalPendingPage;
