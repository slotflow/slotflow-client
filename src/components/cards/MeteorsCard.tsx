import React from "react";
import { Meteors } from "../ui/meteors";

const MeteorsCard: React.FC = ({

}) => {
  return (
    <div className="relative w-full">
      {/* <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-xl" /> */}
      <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl px-4 py-8">
        <h1 className="relative z-50 mb-4 text-xl font-bold">
          title
        </h1>

        <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
          description
        </p>
        <Meteors number={20} />
      </div>
    </div>
  );
}

export default MeteorsCard;