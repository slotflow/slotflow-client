import React from "react";
import { Meteors } from "@/components/ui/meteors";

interface MeteorsCardProps {
  title: string;
  content: string;
}

const MeteorsCard: React.FC<MeteorsCardProps> = ({
  title,
  content
}) => {
  return (
    <div className="">
      <div className="relative w-full max-w-xl">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-[#635bff] bg-white dark:bg-black px-4 py-8 shadow-xl">
          <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
            {title}
          </h1>

          <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
            {content}
          </p>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}

export default MeteorsCard;