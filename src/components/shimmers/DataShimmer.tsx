import { DataShimmerProps } from '@/shared/types/component';

const DataShimmer = ({ w = 'w-full', h = 'h-4', className = '' }: DataShimmerProps) => {
  return <div className={`shimmer rounded ${w} ${h} ${className}`} />;
};

export default DataShimmer;
