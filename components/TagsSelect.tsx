import Select from 'react-select';

export const TagsSelect = (props: {
  values: string[];
  onSelect: (values: string[]) => void;
  options: string[];
}) => {
  return (
    <Select
      isMulti
      name="tags"
      value={props.values.map((value) => ({ value, label: value }))}
      onChange={(values) => props.onSelect(values.map((v) => v.value))}
      options={props.options.map((value) => ({ value, label: value }))}
    />
  );
};
