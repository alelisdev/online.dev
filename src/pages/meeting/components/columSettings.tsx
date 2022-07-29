import React from 'react';
import Switch from '../../../components/switch';
import Range from '../../../components/range';
import Dropdown from './dropdown';
import { useDispatch } from 'react-redux';
import { changeVideoBlur } from '../../../store/meeting/actions';
import { VIRTUAL_BACKGROUND_TYPE } from '../../../store/meeting/constants';

const attentionValues = ['Attention Value', 'Voice Indicator', 'Behavior Indicator'];

const videoSettings = ['Luminance', 'Saturation', 'Background Blur', 'Clarity'];

const callSettings = ['NotePad', 'Timer', 'Web', 'Voice Indicator Detail', 'Behavior details'];

//TODO delete this component

const ColumnSettings = () => {
  const dispatch = useDispatch();
  const handleVideoSettingChange = (value: number, slug: string) => {
    if (slug === 'Background Blur') {
      dispatch(
        changeVideoBlur({
          backgroundType: VIRTUAL_BACKGROUND_TYPE.BLUR,
          blurValue: value,
        }),
      );
    }
  };
  return (
    <>
      <div className="pb-4">
        <Dropdown title="Call Settings">
          <div>
            {attentionValues.map((value) => (
              <div className="pt-3" key={value}>
                <Switch label={value} />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <div className="pb-4">
        <Dropdown title="Video Settings">
          <div>
            {videoSettings.map((v) => (
              <div className="pt-3" key={v}>
                <Range
                  label={v}
                  id={v}
                  onChange={(value: number) => {
                    handleVideoSettingChange(value, v);
                  }}
                />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
      <div>
        <Dropdown title="Call Settings">
          <div>
            {callSettings.map((value) => (
              <div className="pt-3" key={value}>
                <Switch label={value} />
              </div>
            ))}
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ColumnSettings;
