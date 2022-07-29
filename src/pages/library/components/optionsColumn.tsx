import React, { useState } from 'react';
import ReactSelect from '../../../components/select/reactSelect';

const options1 = [{ label: 'option1', value: 'option1' }];
const options2 = [{ label: 'option2', value: 'option2' }];
const options3 = [{ label: 'option3', value: 'option3' }];

const OptionsColumn = () => {
  const [option1, setOption1] = useState(options1[0]);
  const [option2, setOption2] = useState(options2[0]);
  const [option3, setOption3] = useState(options3[0]);

  return (
    <div className="options-wrapper rounded-3 d-flex flex-column justify-content-center">
      <div className="option-wrapper form-group mb-4">
        <label htmlFor="main-select">Option 1</label>
        <ReactSelect
          options={options1}
          value={option1}
          onChange={(e: any) => setOption1(e.target.value)}
        />
      </div>
      <div className="option-wrapper form-group mb-4">
        <label htmlFor="main-select">Option 2</label>
        <ReactSelect
          options={options2}
          value={option2}
          onChange={(e: any) => setOption2(e.target.value)}
        />
      </div>
      <div className="option-wrapper form-group mb-4">
        <label htmlFor="main-select">Option 3</label>
        <ReactSelect
          options={options3}
          value={option3}
          onChange={(e: any) => setOption3(e.target.value)}
        />
      </div>
      <div className="option-wrapper form-group mb-4">
        <label htmlFor="main-select">Option 4</label>
        <ReactSelect
          options={options3}
          value={option3}
          onChange={(e: any) => setOption3(e.target.value)}
        />
      </div>
      <button className="btn btn-primary btn-lg w-100 mt-5">
        <span className="text-light fs-6 ps-2">Done</span>
      </button>
    </div>
  );
};

export default OptionsColumn;
