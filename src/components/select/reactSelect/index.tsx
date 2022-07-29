import Select from 'react-select';

type props = {
  options: any;
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
  // control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  // }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default function ReactSelect({ value, options, onChange }: props) {
  return <Select styles={customStyles} options={options} value={value} onChange={onChange} />;
}
