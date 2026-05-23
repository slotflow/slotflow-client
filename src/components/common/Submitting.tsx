import React from "react";
import { LoaderCircle } from "lucide-react";

const Submitting: React.FC = () => {
    return (
        <div className="flex space-x-4 animate-pulse">
            <LoaderCircle className="animate-spin" />
            <span>Updating</span>
        </div>
    )
}

export default Submitting;