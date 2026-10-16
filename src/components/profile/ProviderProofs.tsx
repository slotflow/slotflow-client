import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/utils/constants/appConstants';
import { ImageUpscale, Minimize2 } from 'lucide-react';
import DataFetchingError from '../error/DataFetchingError';
import { ProviderProofsProps } from '@/shared/types/component';
import noImage from '../../assets/defaultImages/imagePlaceholder.png';
import ProfileDetailsShimmer from '@/components/shimmers/DataFieldShimmer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ProviderProofs = ({ providerId, fetchApiFunction }: ProviderProofsProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      const res = await fetchApiFunction(providerId);
      return res.data;
    },
    queryKey: [queryKeys.PROOFS, providerId],
  });

  const [expandIdentity, setExpandIdentity] = useState(false);
  const [expandService, setExpandService] = useState(false);

  if (isError) {
    return <DataFetchingError message={error.message} />;
  }

  if (isLoading) {
    return <ProfileDetailsShimmer row={2} className="mt-2" />;
  }

  const identityProof = data?.identityProof || noImage;
  const serviceProof = data?.serviceProof || noImage;

  return (
    <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        className={`transition-all duration-300 ${expandIdentity ? 'col-span-2 w-full' : 'w-full'}`}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-base font-semibold">Identity Proof</CardTitle>
          <Button
            title={expandIdentity ? 'Minimize' : 'Maximize'}
            variant="secondary"
            size="sm"
            onClick={() => setExpandIdentity(!expandIdentity)}
          >
            {expandIdentity ? (
              <>
                <Minimize2 className="size-4 mr-1" /> Minimize
              </>
            ) : (
              <>
                <ImageUpscale className="size-4 mr-1" /> Maximize
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          <img
            src={identityProof as string}
            className={`rounded-md mx-auto object-contain transition-all duration-300 ${
              expandIdentity ? 'max-h-[600px] w-full' : 'max-h-[300px]'
            }`}
          />
        </CardContent>
      </Card>

      <Card
        className={`transition-all duration-300 ${expandService ? 'col-span-2 w-full' : 'w-full'}`}
      >
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-base font-semibold">Service Proof</CardTitle>
          <Button
            title={expandService ? 'Minimize' : 'Maximize'}
            variant="secondary"
            size="sm"
            onClick={() => setExpandService(!expandService)}
          >
            {expandService ? (
              <>
                <Minimize2 className="size-4 mr-1" /> Minimize
              </>
            ) : (
              <>
                <ImageUpscale className="size-4 mr-1" /> Maximize
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          <img
            src={serviceProof as string}
            className={`rounded-md mx-auto object-contain transition-all duration-300 ${
              expandService ? 'max-h-[600px] w-full' : 'max-h-[300px]'
            }`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderProofs;
