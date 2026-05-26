import { LoaderCircle } from "lucide-react";

const BoardingLoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-[300px]">
      <LoaderCircle className="animate-spin h-8 w-8 text-primary" />
      <span className="ml-2 text-lg">Loading step...</span>
    </div>
  );
};

export default BoardingLoadingFallback;
