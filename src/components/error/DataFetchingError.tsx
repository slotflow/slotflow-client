import fetchError from "../../assets/svgs/fetch-error.svg";
import { dataFetchingError } from "@/shared/interface/componentInterface";

const DataFetchingError: React.FC<dataFetchingError> = ({ message, className }) => {
    return (
        <div className={`flex flex-col flex-grow min-h-full ${className}`}>
            <div className="w-full flex flex-col justify-center items-center flex-grow">
                <img 
                    src={fetchError}
                    className="h-40 md:h-80"
                />
                <h6>{message || "Fetching error please try again."}</h6>
            </div>
        </div>
    )
}

export default DataFetchingError