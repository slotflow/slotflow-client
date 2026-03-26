import React from 'react';
import { Role } from '@/utils/interface/enums';
import ReviewsPage from '../common/ReviewsPage';
import { fetchReviews } from '@/utils/apis/review';

const ProviderReviewPage: React.FC = () => {
  return (
    <ReviewsPage fetchFunction={fetchReviews} role={Role.PROVIDER} className='p-4' />
  )
}

export default ProviderReviewPage