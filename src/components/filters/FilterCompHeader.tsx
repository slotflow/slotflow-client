import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FilterCompHeaderProps } from "@/shared/interface/componentInterface";

const FilterCompHeader: React.FC<FilterCompHeaderProps> = ({
  title,
  isOpen,
  onToggle,
  Icon
}) => {
  return (
    <div className="flex justify-between items-center">
      <h5 className="font-medium flex items-center gap-2"><Icon className="size-4" /> {title}</h5>
      <Button
        title="Toggle Filter"
        type="button"
        variant="outline"
        size="icon"
        className="cursor-pointer size-8"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`Toggle ${title}`}
      >
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default FilterCompHeader;
