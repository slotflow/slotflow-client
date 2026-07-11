import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ProviderPlanCardShimmer = () => {
    return (
        <Card className="p-4 border rounded-2xl shadow-sm flex flex-col h-full">
            <CardHeader>
                <CardTitle className="w-3/4 h-6 rounded-md shimmer"></CardTitle>
                <div className="w-1/4 h-5 mt-2 rounded-md shimmer"></div>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                        <li key={i} className="w-5/6 h-4 rounded-md shimmer"></li>
                    ))}
                </ul>
                <div className="mt-4 h-4 w-3/4 rounded-md shimmer"></div>
            </CardContent>
            <div className="mt-auto">
                <div className="w-full h-8 rounded-md shimmer" ></div>
            </div>
        </Card>
    )
}

export default ProviderPlanCardShimmer