import { NoDataProps } from "@/shared/interface/componentInterface";

const NoData = ({ 
    message
 }: NoDataProps) => {
    return (
        <div className={`flex flex-col flex-grow min-h-full`}>
            <div className="w-full flex flex-col justify-center items-center flex-grow">
                <h6>{message}</h6>
            </div>
        </div>
    );
};

export default NoData;