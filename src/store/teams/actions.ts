import { ICreateTeamRequest, Team } from '../../types/team';
import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  FETCH_TEAMS_BY_PAYLOAD_REQUEST,
  FETCH_TEAMS_BY_PAYLOAD_SUCCESS,
  FETCH_TEAMS_BY_PAYLOAD_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
} from './constants';

export const fetchTeamRequest = (id: string) => ({ type: FETCH_TEAM_REQUEST, meta: id });
export const fetchTeamSuccess = (payload: Team) => ({ type: FETCH_TEAM_SUCCESS, payload });
export const fetchTeamFailure = (errors: any) => ({ type: FETCH_TEAM_FAILURE, errors });

export const fetchTeamsByPayloadRequest = (params: Partial<Team>) => ({
  type: FETCH_TEAMS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchTeamsByPayloadSuccess = (payload: Team[]) => ({
  type: FETCH_TEAMS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchTeamsByPayloadFailure = (errors: any) => ({
  type: FETCH_TEAMS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createTeamRequest = (params: ICreateTeamRequest) => ({
  type: CREATE_TEAM_REQUEST,
  payload: params,
});
export const createTeamSuccess = (payload: Team) => ({ type: CREATE_TEAM_SUCCESS, payload });
export const createTeamFailure = (errors: any) => ({ type: CREATE_TEAM_FAILURE, errors });

export const updateTeamRequest = (id: string, params: Partial<Team>) => ({
  type: UPDATE_TEAM_REQUEST,
  payload: params,
  meta: id,
});
export const updateTeamSuccess = (payload: Team) => ({ type: UPDATE_TEAM_SUCCESS, payload });
export const updateTeamFailure = (errors: any) => ({ type: UPDATE_TEAM_FAILURE, errors });

export const deleteTeamRequest = (id: string) => ({
  type: DELETE_TEAM_REQUEST,
  meta: id,
});
export const deleteTeamSuccess = (id: string) => ({ type: DELETE_TEAM_SUCCESS, id });
export const deleteTeamFailure = (errors: any) => ({ type: DELETE_TEAM_FAILURE, errors });
