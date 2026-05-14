import React from "react";
import { Loader2 } from "lucide-react";

// Used in the forms
const Submitting: React.FC = () => {
    return (
        <div className="flex space-x-4 animate-pulse">
            <Loader2 className="animate-spin" />
            <span>Updating</span>
        </div>
    )
}

export default Submitting;