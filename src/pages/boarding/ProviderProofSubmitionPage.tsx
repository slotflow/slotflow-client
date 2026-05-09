import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import FileUploader from "@/components/form/CommonForms/FileUploader";
import { setIsProofSubmitted } from "@/shared/redux/slices/authSlice";
import { defaultButtonClassName, redirectPaths } from "@/shared/utils/constants";
import { setProviderIdentityProofs, setProviderServiceProofs } from "@/shared/redux/slices/providerSlice";
import { providerDeleteIdentityProof, providerDeleteServiceProof, providerFetchProofs, providerUpdateIdentityProof, providerUpdateProofServiceProof } from "@/shared/apis/providerProfile";

const ProviderProofSubmissionPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { identityProof, serviceProof } = useSelector((state: RootState) => state.provider);

  useEffect(() => {
    console.log("authUser : ", authUser);
    if (!authUser?.isProofSubmitted?.identityProof && !authUser?.isProofSubmitted?.serviceProof) return;
    async function fetchOldProofs() {
      console.log("fetching data");
      const result = await providerFetchProofs();
      console.log("result : ", result);
      if (result) {
        dispatch(setProviderIdentityProofs({
          file: result.data?.identityProof as string,
          isLoading: false,
        }));
        dispatch(setProviderServiceProofs({
          file: result.data?.serviceProof as string,
          isLoading: false,
        }));
      }
    }

    fetchOldProofs();
  }, [authUser?.isProofSubmitted?.identityProof, authUser?.isProofSubmitted?.serviceProof, dispatch]);

  if (!authUser) return null;

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  const handleNextutton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSubmitting(true);
    e.preventDefault();
    dispatch(setIsProofSubmitted());
    await delay(1000);
    navigate(redirectPaths.ONBOARDING_PENDING);
    setIsSubmitting(false);
  }

  return (
    <div className="md:flex w-full space-y-6 space-x-2">
      <div className="space-y-4 w-full space-x-2 pt-6">
        <FileUploader
          folderName="provider-proof"
          uploadFunction={providerUpdateIdentityProof}
          message="Please upload a valid identity document issued in your country. Make sure the document is clear and readable for verification."
          setStateFunction={setProviderIdentityProofs}
          deleteFunction={providerDeleteIdentityProof}
          data={identityProof}
          title="Identity Proof"
        />
        <FileUploader
          folderName="provider-proof"
          uploadFunction={providerUpdateProofServiceProof}
          message="If you are offering a service, upload a valid certification or an experience document that verifies your professional qualifications."
          setStateFunction={setProviderServiceProofs}
          deleteFunction={providerDeleteServiceProof}
          data={serviceProof}
          title="Service Proof"
        />

        <div className="flex justify-end">
          <Button
            title="Submit proofs"
            variant="default"
            onClick={handleNextutton}
            className={defaultButtonClassName}
            type="button"
            disabled={isSubmitting || (!identityProof.file || !serviceProof.file)}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin size-4 mr-2" />
                {(authUser?.isProofSubmitted && isSubmitting) ? "Updating" : "Submitting"}
              </>
            ) : (
              (authUser?.isProofSubmitted?.identityProof && authUser?.isProofSubmitted?.serviceProof) ? "Update" : "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProviderProofSubmissionPage;