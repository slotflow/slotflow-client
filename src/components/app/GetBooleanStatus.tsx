import IconText from './IconText';
import { StatusPreset } from '@/shared/types/common';

const getBooleanStatusComponent = (value?: boolean, preset?: StatusPreset) => {
  if (!preset) return null;

  return (
    <IconText
      text={value ? preset.trueText : preset.falseText}
      className={value ? preset.trueClass : preset.falseClass}
    />
  );
};

export default getBooleanStatusComponent;
