import Select from 'react-select';

export const CustomSelect = (props: {
  value: string[];
  onSelect: (values: string[]) => void;
  options: string[];
}) => {
  return (
    <Select
      isMulti
      name="tags"
      value={toSelects(props.value)}
      onChange={(selects) => props.onSelect(selects.map((v) => v.value))}
      options={toSelects(props.options)}
    />
  );
};

const toSelects = (values: string[]) =>
  values.map((value) => ({ value, label: value }));
