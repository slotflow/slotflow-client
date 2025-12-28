import React from "react";
import { Button } from "@/components/ui/button";

interface TableHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  actionLabel,
  onActionClick,
}) => {
  return (
    <div className="flex justify-between items-center px-4 mb-2">
      <h2 className="text-2xl font-bold">{title}</h2>

      {actionLabel && onActionClick && (
        <Button
          variant="default"
          className="cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default TableHeader;
