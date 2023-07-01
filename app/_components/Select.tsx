import { ForwardedRef, forwardRef } from 'react';
import ReactSelect from 'react-select';

const toSelects = (values: string[]) =>
  values.map((value) => ({ value, label: value }));

export const Select = forwardRef(function _Select(
  props: {
    name: string;
    value: string[];
    onSelect: (values: string[]) => void;
    options: string[];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<any>
) {
  return (
    <ReactSelect
      isMulti
      name={props.name}
      value={toSelects(props.value)}
      onChange={(selects) => props.onSelect(selects.map((v) => v.value))}
      options={toSelects(props.options)}
      className="react-select-container"
      classNamePrefix="react-select"
      ref={ref}
    />
  );
});
