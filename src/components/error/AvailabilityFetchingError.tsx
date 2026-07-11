import fetchError from "../../assets/svgs/fetch-error.svg";
import noAvailability from "../../assets/svgs/availability.svg";
import { AvailablityFetchingErrorProps } from "@/shared/interface/componentInterface";

const AvailablityFetchingError = ({
    isAvailable
}: AvailablityFetchingErrorProps) => {
    return (
        <div className="md:col-span-8 flex flex-col items-center">
                <img 
                    src={!isAvailable ? noAvailability : fetchError}
                    className="h-40 md:h-80"
                />
                <h6>{!isAvailable ? "Service not available for this date." : "Fetching error please try again." }</h6>
            </div>
    )
}

export default AvailablityFetchingError;