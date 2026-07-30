import SideBoxSteps from './SideBoxSteps';
import SideBoxHeader from './SideBoxHeader';
import { boardingData, } from '@/shared/utils/constants';
import { SideBoxProps } from '@/shared/interface/componentInterface';

const SideBox = ({
  pageNumber
}: SideBoxProps) => {

  const description = boardingData[pageNumber].description || '';

  return (
    <aside className="hidden lg:flex  bg-[var(--mainColorTwo)] md:h-screen w-full md:w-4/12 p-6 md:p-10 rounded-r-lg shadow-lg flex-col h-full md:sticky md:top-0">
      <div className="flex h-full w-full flex-col gap-6">
        <SideBoxHeader />
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          {description}
        </p>
        <SideBoxSteps pageNumber={pageNumber} />
        <div className="flex justify-center flex-1 items-center">
          <img
            src={boardingData[pageNumber - 1].image}
            className="h-40 md:h-72 w-full object-contain"
            alt="Illustration"
          />
        </div>
        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">We Offer</p>
          <blockquote className="text-gray-700 italic text-sm leading-relaxed mt-2">
            "At Slotflow, we're dedicated to simplifying service bookings.
            Our platform empowers providers to manage their schedules efficiently."
          </blockquote>
        </div>
      </div>
    </aside>
  );
};

export default SideBox;