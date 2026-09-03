import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ProviderPlanCardShimmer = () => {
  return (
    <Card className="p-4 border rounded-2xl shadow-sm flex flex-col h-full">
      <CardHeader>
        <CardTitle className="w-3/4 h-10 rounded-md shimmer mx-auto"></CardTitle>
        <div className="w-2/4 h-8 mt-2 rounded-md shimmer mx-auto"></div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <li key={i} className="w-5/6 h-4 rounded-md shimmer mx-auto"></li>
          ))}
        </ul>
      </CardContent>
      <div className="mt-auto">
        <div className="w-full h-8 rounded-md shimmer"></div>
      </div>
    </Card>
  );
};

export default ProviderPlanCardShimmer;
