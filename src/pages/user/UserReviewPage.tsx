import React from 'react';
import { Role } from '@/utils/interface/enums';
import ReviewsPage from '../common/ReviewsPage';
import { fetchReviews } from '@/utils/apis/review.api';

const UserReviewPage: React.FC = () => {
    return (
        <div className="h-full">
            <ReviewsPage fetchFunction={fetchReviews} role={Role.USER} className='p-4' />
        </div>
    )
}

export default UserReviewPage