import React from 'react';

interface HeadingProps {
  heading: string;
  headingDescription: string;
}

const Heading: React.FC<HeadingProps> = ({
  heading,
  headingDescription,
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14" data-aos="fade-up">
      <h2 className="text-black dark:text-white scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0">
        {heading}
      </h2>
      <p className="mt-1 text-muted-foreground">
        {headingDescription}
      </p>
    </div>
  )
}

export default Heading