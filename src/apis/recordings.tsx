import { IAddTranslationRequest, ICreateRecordingRequest, Recording } from '../types/recording';
import CxClient from '../utils/axios';

export const createRecording = async (params: ICreateRecordingRequest) => {
  try {
    const response = await CxClient.post(`/recordings`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getRecordingsByMeetingId = async (params: Partial<Recording>) => {
  try {
    const response = await CxClient.post(`/recordings/getAllByMeetingId`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const addTranslation = async (params: IAddTranslationRequest) => {
  try {
    const response = await CxClient.post(`/recordings/addTranslation`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const getTranscriptionsByMeetingId = async (params: Partial<Recording>) => {
  try {
    const response = await CxClient.post(`/recordings/getTranscriptionsByMeeting`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};
