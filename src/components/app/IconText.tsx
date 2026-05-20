import React from "react";

interface IconTextProps {
  text: string;
  className?: string;
};

const IconText: React.FC<IconTextProps> = ({
  text,
  className = "",
}) => {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {text}
    </span>
  );
};

export default IconText;