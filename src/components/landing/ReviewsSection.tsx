import { appConfig } from '@/shared/config/env';
import ReviewHeader from './review/reviewHeader';
import MoveUpward from '../animation/MoveUpward';
import { useEffect, useRef, useState } from 'react';
import { getReviews } from '@/shared/apis/contentful';
import { useDispatch, useSelector } from 'react-redux';
import { setReviews } from '@/shared/redux/slices/appSlice';
import { AppDispatch, RootState } from '@/shared/redux/appStore';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const ReviewsSection = () => {

    const dispatch = useDispatch<AppDispatch>();
    const reviews = useSelector((state: RootState) => state.app.reviews);
    const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
    const hasFetchedReviews = useRef(false);

    useEffect(() => {
        if (hasFetchedReviews.current || reviews.length >= 10) {
            return;
        }

        hasFetchedReviews.current = true;
        let isActive = true;

        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);
                const fetchedReviews = await getReviews();

                if (isActive) {
                    dispatch(setReviews(fetchedReviews));
                }
            } catch (error) {
                if (appConfig.isDevelopment) {
                    console.error("Failed to fetch reviews:", error);
                }
            } finally {
                if (isActive) {
                    setReviewsLoading(false);
                }
            }
        };

        void fetchReviews();

        return () => {
            isActive = false;
        };
    }, [dispatch, reviews.length]);

    const firstRowReviews = reviews.slice(0, 5);
    const secondRowReviews = reviews.slice(5, 10);

    return (
        <section id="reviews">
             <MoveUpward>
                <ReviewHeader />
             </MoveUpward>
            <div>
                <div className="w-full overflow-hidden leading-0 bg-(--menuItemHoverBg)" >
                    <svg
                        className="relative block rotate-y-180"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-(--mainColor)"></path>
                        <path d="M1250 120L0 12.48 0 0 1200 0 1200 120z" className="fill-(--background)"></path>
                    </svg>
                </div>
                <div className="flex flex-col justify-center items-center bg-(--menuItemHoverBg)">
                    {reviewsLoading ? (
                        <div className="w-full px-4 py-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                {[...Array(2)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="space-y-6 w-full md:w-[45%] rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
                                    >
                                        <div className="space-y-3">
                                            <div className="shimmer h-4 w-full rounded" />
                                            <div className="shimmer h-4 w-full rounded" />
                                            <div className="shimmer h-4 w-3/4 rounded" />
                                            <div className="shimmer h-4 w-3/4 rounded" />
                                            <div className="shimmer h-4 w-1/2 rounded" />
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <div className="shimmer w-10 h-10 rounded-full"></div>
                                            <div className='flex flex-col space-y-1 ml-2'>
                                                <div className='shimmer w-28 h-4'></div>
                                                <div className='shimmer w-12 h-2'></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {firstRowReviews.length > 0 && (
                                <InfiniteMovingCards
                                    items={firstRowReviews}
                                    direction="right"
                                    speed="normal"
                                />
                            )}
                            {secondRowReviews.length > 0 && (
                                <InfiniteMovingCards
                                    items={secondRowReviews}
                                    direction="left"
                                    speed="normal"
                                    className='hidden md:block'
                                />
                            )}
                            {reviews.length === 0 && !reviewsLoading && (
                                <p className="px-4 py-6 text-sm text-neutral-500 dark:text-neutral-400">
                                    No reviews available yet.
                                </p>
                            )}
                        </>
                    )}
                </div>
                <div className="w-full overflow-hidden leading-0 rotate-180 bg-(--menuItemHoverBg)" >
                    <svg
                        className="relative block"
                        style={{ transform: 'rotateY(180deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="fill-(--mainColor)"></path>
                        <path d="M1250 120L0 13.48 0 0 1200 0 1200 120z" className="fill-(--background)"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export default ReviewsSection;