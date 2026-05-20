import React from "react";
import fetchError from "../../assets/svgs/fetch-error.svg";

interface AvailablityFetchingErrorProps {
    message?: string;
}

const AvailablityFetchingError:React.FC<AvailablityFetchingErrorProps> = ({
    message
}) => {
    return (
        <div className="md:col-span-8 flex flex-col items-center">
                <img 
                    src={fetchError}
                    className="h-40 md:h-80"
                />
                <h6>{message || "Fetching error please try again."}</h6>
            </div>
    )
}

export default AvailablityFetchingError;