import { Card } from "../ui/card";

const ReviewCardsShimmer: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(10)].map((_, index) => (
                <Card key={index} className="h-auto" >
                    <div className="flex items-center gap-2 p-4">
                        <div className="shimmer h-12 w-12 rounded-full"></div>
                        <div className="shimmer h-4 w-56 rounded-sm"></div>
                    </div>
                    <div className="p-4 space-y-1">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="shimmer h-2 w-full rounded-sm"></div>
                        ))}
                    </div>
                    <div className="p-4 flex justify-end">
                        <div className="shimmer h-6 w-24 rounded-sm"></div>
                    </div>
                </Card>
            ))}
        </div>
    )
};

export default ReviewCardsShimmer;