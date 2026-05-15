import React from "react";
import { LucideIcon } from "lucide-react";

interface IconTextProps {
  icon?: LucideIcon;
  text: string;
  className?: string;
};

const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  text,
  className = "",
}) => {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </span>
  );
};

export default IconText;