import { useEffect } from "react";
import { roleArray } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import SideBox from "@/components/provider/SideBox";
import { useDispatch, useSelector } from "react-redux";
import { RedirectTo } from "@/utils/interface/commonInterface";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setIsProofSubmitted } from "@/utils/redux/slices/authSlice";
import FileUploader from "@/components/form/CommonForms/FileUploader";
import { useAuthNavigation } from "@/utils/hooks/systemHooks/useAuthNavigation";
import { setIdentityProofLoading, setProviderIdentityProofs, setProviderServiceProofs, setServiceProofLoading } from "@/utils/redux/slices/providerSlice";
import { providerDeleteIdentityProof, providerDeleteServiceProof, providerFetchProofs, providerUpdateIdentityProof, providerUpdateProofServiceProof } from "@/utils/apis/provider.api";

export const ProviderProofSubmissionPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { goToAuthPage } = useAuthNavigation();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { identityProof, serviceProof, identityProofLoading, serviceProofLoading } = useSelector((state: RootState) => state.provider);

  useEffect(() => {
    if (!authUser?.isProofSubmitted) return;

    async function fetchOldProofs() {
      const result = await providerFetchProofs();
      if (result) {
        dispatch(setProviderIdentityProofs(result.identityProof as string))
        dispatch(setProviderServiceProofs(result.serviceProof as string))
      }
    }

    fetchOldProofs();
  }, [authUser?.isProofSubmitted, dispatch]);

  if (!authUser) return;

  const handleNextutton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setIsProofSubmitted());
    goToAuthPage(roleArray[2], RedirectTo.PROVIDER_APPROVAL_PENDING);
  }

  return (
    <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
      <SideBox props={{ pageNumber: 4 }} />
      <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar">
        <div className="md:mt-10 px-4 md:px-12 py-6">
          <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start px-6">Upload Proofs</h4>
          <div className="flex w-full flex-col space-y-6">
            <div className="space-y-4 w-full px-6 pt-6">

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
                    variant="outline"
                    onClick={handleNextutton}
                    className="cursor-pointer w-full md:w-auto text-xs md:text-sm hover:bg-[var(--mainColor)] hover:text-white border-[var(--mainColor)] flex items-center gap-2"
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
    </div>
  );
}

export default ProviderProofSubmissionPage;