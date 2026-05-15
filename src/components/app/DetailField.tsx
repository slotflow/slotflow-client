import IconText from "./IconText";
import { Button } from "../ui/button";
import { Role } from "@/shared/interface/enums";
import { Copy, TriangleAlert } from "lucide-react";
import { formateDate } from "@/shared/helper/formatter";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { copyToClipboard } from "@/shared/helper/copyToClipboard";
import { DetailFieldProps } from "@/shared/interface/commonInterface";
import { formatBoolean, formatDuration } from "@/shared/helper/formatter";

const DetailField: React.FC<DetailFieldProps> = ({
    defaultValue,
    label,
    value,
    Icon,
    canCopy,
    isBoolean,
    link,
    isPrice,
    isRadioGroup,
    isTime,
    isDate,
    selectedRadioValue,
    onRadioChange,
    role,
    tags
}) => {

    let displayValue: React.ReactNode;

    if (value === null || value === undefined) {
        displayValue = (
            <IconText 
                text="No Data Found"
                className="text-red-500"
                icon={TriangleAlert}
            />
        );
    } else if (isRadioGroup && Array.isArray(value)) {
        displayValue = role === Role.ADMIN ? (
            <div className="flex space-x-2">
                {value.map((item) => (
                    <label key={item} htmlFor={item} className="text-sm font-medium leading-none">
                        {item}
                    </label>
                ))}
            </div>
        ) : (
            <RadioGroup value={selectedRadioValue} onValueChange={onRadioChange} className="flex">
                {value.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                        <RadioGroupItem value={item} id={item} />
                        <label htmlFor={item} className="text-sm font-medium leading-none">{item}</label>
                    </div>
                ))}
            </RadioGroup>
        );
    } else if (isBoolean) {
        displayValue = formatBoolean(value as boolean);
    } else if (isPrice) {
        displayValue = `₹ ${value as string} INR`;
    } else if (canCopy && typeof value === "string") {
        displayValue = (
            <div className="flex items-center">
                <p className="mr-2">{value}</p>
                {value !== "Not Yet provided" && (
                    <Button
                        variant="ghost"
                        className="p-0 text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                        onClick={() => copyToClipboard(value)}
                    >
                        <Copy />
                    </Button>
                )}
            </div>
        );
    } else if (isDate) {
        displayValue = formateDate(value as Date);
    } else if (link && typeof value === "string") {
        displayValue = (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {defaultValue || value}
            </a>
        );
    } else if (isTime) {
        displayValue = formatDuration(value as number);
    } else if (tags) {
        displayValue = (value as string[]).map((tag: string) => (
            <span key={tag} className="text-sm px-1 mr-2 rounded-sm bg-[var(--mainColor)] rounded-sm p-1 text-white">{tag}</span>
        ))
    } else {
        displayValue = value as string;
    };

    return (
        <div className="p-3 rounded-lg border shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {Icon && <Icon className="w-4 h-4" />}
                <span>{label}</span>
            </div>

            <div className="text-sm font-semibold">
                {displayValue}
            </div>
        </div>
    );
};

export default DetailField;