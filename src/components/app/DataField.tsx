import IconText from "./IconText";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { formateDate } from "@/shared/helper/formatter";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DetailFieldProps } from "@/shared/interface/commonInterface";
import { formatBoolean, formatDuration } from "@/shared/helper/formatter";

const DataField: React.FC<DetailFieldProps> = ({
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
    tags
}) => {

    let displayValue: React.ReactNode;



    if (value === null || value === undefined || (typeof value === "string" && !value.trim())) {
        displayValue = (
            <IconText
                text="No Data Found"
                className="text-red-500"
            />
        );
    } else if (isRadioGroup && Array.isArray(value)) {
        return (
             <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
            <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
                {Icon && <Icon className="w-4 h-4" />}
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                 <RadioGroup value={selectedRadioValue} onValueChange={onRadioChange} className="flex">
                {value.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                        <RadioGroupItem value={item} id={item} />
                        <label htmlFor={item} className="text-sm font-medium leading-none">{item}</label>
                    </div>
                ))}
            </RadioGroup>
            </div>
        </div>
        )
    } else if (isBoolean) {
        displayValue = formatBoolean(value as boolean);
    } else if (isPrice) {
        displayValue = `₹ ${value as string} INR`;
    } else if (canCopy && typeof value === "string") {
        return (
            <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
            <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
                {Icon && <Icon className="w-4 h-4" />}
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <span className="text-sm font-semibold text-foreground">{value} {value !== "Not Yet provided" && (
                    <Button
                        variant="ghost"
                        className="p-0 hover:bg-0 text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(value);
                            toast.success("Copied")
                        }}
                    >
                        <Copy />
                    </Button>
                )}</span>
            </div>
        </div>
        )
    } else if (isDate) {
        displayValue = formateDate(value as Date);
    } else if (link && typeof value === "string") {
        displayValue = (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Open Url
            </a>
        );
    } else if (isTime) {
        displayValue = formatDuration(value as number);
    } else if (tags) {
        displayValue = (value as string[]).map((tag: string) => (
            tag+", "
        ))
    } else {
        displayValue = value as string;
    };

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
            <div className="p-2 rounded-md bg-background text-primary border shadow-sm">
                {Icon && <Icon className="w-4 h-4" />}
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <p className="text-sm font-semibold text-foreground">{displayValue}</p>
            </div>
        </div>
    );
};

export default DataField;


