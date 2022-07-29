import CxClient from '../utils/axios';

export const fetchClientMeeting = async (id: string) => {
  try {
    const response = await CxClient.get(`/meetings/client/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
