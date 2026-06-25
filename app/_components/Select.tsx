import type { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type Option = { value: string; label: string };

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ value, label: value }));

export const Select = (props: {
  name: string;
  value: string[];
  choices: string[];
  onSelect: (values: string[]) => void;
  ref?: React.Ref<SelectInstance<Option, true>>;
}) => {
  const { name, value, choices, onSelect, ref } = props;
  return (
    <CreatableSelect
      isMulti
      name={name}
      value={toOptions(value)}
      onChange={(options) => onSelect(options.map((v) => v.value))}
      options={toOptions(choices)}
      className="react-select-container"
      classNamePrefix="react-select"
      ref={ref}
    />
  );
};
