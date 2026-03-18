import React from "react";
import { LucideIcon } from "lucide-react";

interface AlertProps {
  icon?: LucideIcon;
  heading: string;
  message: string;
}

const AlertBox: React.FC<AlertProps> = ({
  icon: Icon,
  heading,
  message,
}) => {
  return (

    <div className="items-start gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-4 shadow-sm mb-4">
      <div className="flex">
        {Icon && <Icon className="size-5 mt-0.5 text-yellow-600" />}
        <h4 className="font-semibold text-sm ml-2">{heading}</h4>
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-justify">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertBox;
