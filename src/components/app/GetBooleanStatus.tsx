import IconText from "./IconText";
import { StatusPreset } from "@/shared/interface/commonInterface";

const getBooleanStatusComponent = (
  value?: boolean,
  preset?: StatusPreset
) => {

  if (!preset) return null;

  return (
    <IconText
      text={value ? preset.trueText : preset.falseText}
      className={value ? preset.trueClass : preset.falseClass}
      icon={value ? preset.trueIcon : preset.falseIcon}
    />
  );
};

export default getBooleanStatusComponent;