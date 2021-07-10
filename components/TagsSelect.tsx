import Select from 'react-select';

export const TagsSelect = (props: {
  defaultTags: string[] | undefined,
  tagList: string[],
}) => {
  const options = props.tagList.map((tag) => ({ value: tag, label: tag }));

  return <Select
    isMulti
    name="tags"
    options={options}
    value={props.defaultTags?.map(tag => ({ value: tag, label: tag }))}
  />;
};
