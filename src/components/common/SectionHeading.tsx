import React from 'react';
import { SectionHeadingProps } from '@/shared/interface/componentInterface';

const SectionHeading: React.FC<SectionHeadingProps> = ({
  heading,
  headingDescription,
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
      <h2 className="text-black dark:text-white scroll-m-20 border-b pb-2 text-xl md:text-2xl lg:text-4xl first:mt-0 font-bold tracking-tight">
        {heading}
      </h2>
      <p className="mt-1 text-muted-foreground text-lg">
        {headingDescription}
      </p>
    </div>
  )
}

export default SectionHeading