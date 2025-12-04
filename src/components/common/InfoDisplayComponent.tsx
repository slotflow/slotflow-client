import { Copy } from "lucide-react";
import { formatBoolean } from "@/utils/helper";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { InfoDisplayComponentRowProps } from "@/utils/interface/commonInterface";

const InfoDisplayComponent: React.FC<InfoDisplayComponentRowProps> = ({
    defaultValue,
    label,
    value,
    formatDate,
    copyToClipboard,
    isBoolean,
    link,
    isPrice,
    isLast,
    isIframe,
    isRadioGroup,
    selectedRadioValue,
    onRadioChange,
    role
}) => {

    let displayValue: React.ReactNode;

    if (value === null || value === undefined) {
        displayValue = "Not Yet added";
    } else if (isRadioGroup && Array.isArray(value)) {
        displayValue = role === "Admin" ? (
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
    } else if (copyToClipboard && typeof value === "string") {
        displayValue = (
            <div className="flex items-center">
                <p className="mr-2">{value}</p>
                {value !== "Not Yet added" && (
                    <button
                        className="text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer"
                        onClick={() => copyToClipboard(value)}
                    >
                        <Copy />
                    </button>
                )}
            </div>
        );
    } else if (formatDate && typeof value === "string") {
        displayValue = formatDate(value);
    } else if (isIframe) {
        return (
            <tr className={`${!isLast ? "border-b " : ""}`}>
                <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">{label}</td>
                <td className="p-4 w-8/12">
                    <iframe src={value as string} width="600" height="450" loading="lazy" ></iframe>
                </td>
            </tr>
        )
    } else if (link && typeof value === "string") {
        displayValue = (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {defaultValue || value}
            </a>
        );
    } else {
        displayValue = value as string;
    }

    return (
        <tr className={`${!isLast ? "border-b " : ""}`}>
            <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">{label}</td>
            <td className="p-4 w-8/12">{displayValue}</td>
        </tr>
    );
}

export default InfoDisplayComponent