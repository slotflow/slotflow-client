import React from 'react';
import ReviewsPage from '../common/ReviewsPage';
import { providerFetchAllReviews } from '@/utils/apis/provider.api';
import { Role } from '@/utils/interface/enums';

const ProviderReviewPage: React.FC = () => {
  return (
    <div>
        <ReviewsPage isProvider fetchFun={providerFetchAllReviews} role={Role.PROVIDER} className='p-4' />
    </div>
  )
}

export default ProviderReviewPage