import React from 'react';
import ReactSelect from '../../../components/select/reactSelect';

interface IProps {
  options: Array<any>;
  selectedValue: any;
  handleChange: (e: any) => void;
}

export default function Filter(props: IProps) {
  const { options, selectedValue, handleChange } = props;
  return (
    <>
      <div className="col-auto label">Filtery By</div>
      <div className="col-3">
        <ReactSelect options={options} value={selectedValue} onChange={handleChange} />
      </div>
    </>
  );
}
