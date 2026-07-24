import { IconTextProps } from "@/shared/interface/componentInterface";

const IconText = ({
  text,
  className = "",
}: IconTextProps) => {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      {text}
    </span>
  );
};

export default IconText;