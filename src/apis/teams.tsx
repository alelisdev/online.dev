import { ICreateTeamRequest, Team } from '../types/team';
import CxClient from '../utils/axios';

export const fetchTeam = async (id: string) => {
  try {
    const response = await CxClient.get(`/teams/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchTeamsByPayload = async (params: Partial<Team>) => {
  try {
    const response = await CxClient.post('/teams/getByPayload', params);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const createTeam = async (params: ICreateTeamRequest) => {
  try {
    const response = await CxClient.post(`/teams`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const updateTeam = async (id: string, params: Partial<Team>) => {
  try {
    const response = await CxClient.patch(`/teams/${id}`, { ...params });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const deleteTeam = async (id: string) => {
  try {
    const response = await CxClient.delete(`/teams/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
