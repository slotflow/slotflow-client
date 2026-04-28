import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/onboarding/SideBox";
import { useDispatch, useSelector } from "react-redux";
import { redirectPaths } from "@/shared/utils/constants";
import { AppDispatch, RootState } from "@/shared/redux/appStore";
import { setIsProofSubmitted } from "@/shared/redux/slices/authSlice";
import FileUploader from "@/components/form/CommonForms/FileUploader";
import { setIdentityProofLoading, setProviderIdentityProofs, setProviderServiceProofs, setServiceProofLoading } from "@/shared/redux/slices/providerSlice";
import { providerDeleteIdentityProof, providerDeleteServiceProof, providerFetchProofs, providerUpdateIdentityProof, providerUpdateProofServiceProof } from "@/shared/apis/providerProfile";

const ProviderProofSubmissionPage: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { identityProof, serviceProof, identityProofLoading, serviceProofLoading } = useSelector((state: RootState) => state.provider);

  useEffect(() => {
    if (!authUser?.isProofSubmitted) return;

    async function fetchOldProofs() {
      const result = await providerFetchProofs();
      if (result) {
        dispatch(setProviderIdentityProofs(result.data?.identityProof as string))
        dispatch(setProviderServiceProofs(result.data?.serviceProof as string))
      }
    }

    fetchOldProofs();
  }, [authUser?.isProofSubmitted, dispatch]);

  if (!authUser) return;

  const handleNextutton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setIsProofSubmitted());
    navigate(redirectPaths.PROVIDER_APPROVAL_PENDING);
  }

  return (
    <div className="md:min-h-screen md:flex justify-center w-full bg-[var(--background)] ">
      <SideBox pageNumber={4} />
      <div className="w-full md:w-8/12 p-6 md:p-10">

        <h4 className="text-xl lg:text-2xl font-semibold text-start">Tell us about your service</h4>
        <div className="md:flex w-full space-y-6 space-x-2">
          <div className="space-y-4 w-full space-x-2 pt-6">
            <FileUploader
              folderName="provider-proof"
              uploadFunction={providerUpdateIdentityProof}
              message="Please upload a valid identity document issued in your country. Make sure the document is clear and readable for verification."
              setStateFunction={setProviderIdentityProofs}
              setLoadingFunction={setIdentityProofLoading}
              fileUploaded={!!identityProof}
              deleteFunction={providerDeleteIdentityProof}
              loading={identityProofLoading}
              data={identityProof}
            />
            <FileUploader
              folderName="provider-proof"
              uploadFunction={providerUpdateProofServiceProof}
              message="If you are offering a service, upload a valid certification or an experience document that verifies your professional qualifications."
              setStateFunction={setProviderServiceProofs}
              setLoadingFunction={setServiceProofLoading}
              fileUploaded={!!serviceProof}
              deleteFunction={providerDeleteServiceProof}
              loading={serviceProofLoading}
              data={serviceProof}
            />

            <div className="flex justify-end">
              {(identityProof && serviceProof) && (
                <Button
                  title="Next"
                  variant="default"
                  onClick={handleNextutton}
                  className="cursor-pointer w-full md:w-auto hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
                  type="button"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderProofSubmissionPage;