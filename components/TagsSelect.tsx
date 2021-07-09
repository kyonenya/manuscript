import Select from 'react-select';

export const TagsSelect = (props: { tagList: string[] }) => {
  const options = props.tagList.map((tag) => ({ value: tag, label: tag }));

  return <Select isMulti name="tags" options={options} />;
};
