import { CSSProperties } from 'react';
import Select from 'react-select';

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly [];
}

interface GroupElementOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

type props = {
  groupedOptions: GroupedOption[];
  value: any;
  onChange: any;
};

const customStyles = {
  // option: (provided: any, state: any) => ({
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#fff' : '#333333',
    padding: 5,
    fontSize: 12,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export default function GroupedSelect({ value, groupedOptions, onChange }: props) {
  return (
    <Select<GroupElementOption, false, GroupedOption>
      defaultValue={value}
      options={groupedOptions}
      styles={customStyles}
      value={value}
      onChange={onChange}
      formatGroupLabel={formatGroupLabel}
    />
  );
}
