import React from 'react';
import ReviewsPage from '../common/ReviewsPage';
import { userFetchAllReviews } from '@/utils/apis/user.api';
import { Role } from '@/utils/interface/enums';

const UserReviewPage: React.FC = () => {
    return (
        <div className="h-full">
            <ReviewsPage isUser fetchFun={userFetchAllReviews} role={Role.USER} className='p-4' />
        </div>
    )
}

export default UserReviewPage