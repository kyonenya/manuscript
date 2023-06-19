import { forwardRef, Ref } from 'react';
import Select from 'react-select';

const toSelects = (values: string[]) =>
  values.map((value) => ({ value, label: value }));

const CustomSelectComponent = (
  props: {
    value: string[];
    onSelect: (values: string[]) => void;
    options: string[];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: Ref<any>
) => {
  return (
    <Select
      isMulti
      name="tags"
      value={toSelects(props.value)}
      onChange={(selects) => props.onSelect(selects.map((v) => v.value))}
      options={toSelects(props.options)}
      className="react-select-container"
      classNamePrefix="react-select"
      ref={ref}
    />
  );
};

export const CustomSelect = forwardRef(CustomSelectComponent);
