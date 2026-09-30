import { ServiceCategory } from '@/shared/types/enums';
import { UserFetchServiceProvidersRequest } from '@/shared/types/api/user';

export const parseFiltersFromSearchParams = (
  searchParams: URLSearchParams,
  pageParam: number = 0,
  limit: number = 12
): UserFetchServiceProvidersRequest => {
  const categoriesParam = searchParams.get('categories');
  const appServiceIdsParam = searchParams.get('appServiceIds');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const slotflowTrusted = searchParams.get('slotflowTrusted');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const categories = categoriesParam
    ? (categoriesParam.split(',') as ServiceCategory[])
    : undefined;

  const appServiceIds = appServiceIdsParam
    ? appServiceIdsParam.split(',')
    : undefined;

  return {
    skip: pageParam,
    limit,
    ...(categories && categories.length > 0 && { categories }),
    ...(appServiceIds && appServiceIds.length > 0 && { appServiceIds }),
    ...(minPrice !== null && { minPrice: Number(minPrice) }),
    ...(maxPrice !== null && { maxPrice: Number(maxPrice) }),
    ...(slotflowTrusted !== null && { slotflowTrusted: slotflowTrusted === 'true' }),
    ...(lat !== null && lng !== null && {
      location: {
        type: 'Point',
        coordinates: [Number(lng), Number(lat)],
      },
    }),
  };
};