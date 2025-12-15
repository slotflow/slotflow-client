import React from 'react';
import ReviewsPage from '../common/ReviewsPage';
import { userFetchAllReviews } from '@/utils/apis/user.api';

const UserReviewPage: React.FC = () => {
    return (
        <div className="h-full">
            <ReviewsPage isUser fetchFun={userFetchAllReviews} role={"USER"} className='p-4' />
        </div>
    )
}

export default UserReviewPage