import Select from 'react-select';

const options = [
  { value: '演技', label: '演技' },
  { value: '行為', label: '行為' },
  { value: '思考', label: '思考' },
];

export const TagsSelect = () => {
  return <Select isMulti name="tags" options={options} />;
};
