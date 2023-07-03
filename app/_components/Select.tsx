import CreatableSelect from 'react-select/creatable';

type Option = { value: string; label: string };

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ value, label: value }));

export const Select = (props: {
  name: string;
  value: string[];
  choices: string[];
  onSelect: (values: string[]) => void;
}) => {
  return (
    <CreatableSelect
      isMulti
      name={props.name}
      value={toOptions(props.value)}
      onChange={(options) => props.onSelect(options.map((v) => v.value))}
      options={toOptions(props.choices)}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
};
