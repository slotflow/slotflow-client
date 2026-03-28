import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <Loader2 className="animate-spin h-8 w-8 text-primary" />
      <span className="ml-2 text-lg">Loading...</span>
    </div>
  );
};

export default LoadingFallback;
