import CxClient from '../utils/axios';

export const fetchPresets = async () => {
  try {
    const response = await CxClient.get('/presets');
    if (response.status === 200) {
      return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.data.message;
  } catch (e) {
    return e;
  }
};

export const getPreset = async (presetId: any) => {
  try {
    const response = await CxClient.get(`/presets/${presetId}`);
    if (response.status === 200) {
      return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.data.message;
  } catch (e) {
    return e;
  }
};
