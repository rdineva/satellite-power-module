import { ActionType, createAsyncAction } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { PowerModuleState, PayloadType } from '../types';
import axios from 'axios';
import ApiService from '../services/api-service';

export const actions = {
  fetchPowerModuleState: createAsyncAction(
    'FETCH_POWER_MODULE_STATE_REQUEST',
    'FETCH_POWER_MODULE_STATE_SUCCESS',
    'FETCH_POWER_MODULE_STATE_ERROR',
  )<void, PowerModuleState['payloads'], string>(),
  connectPayload: createAsyncAction(
    'CONNECT_PAYLOAD_REQUEST',
    'CONNECT_PAYLOAD_SUCCESS',
    'CONNECT_PAYLOAD_ERROR',
  )<PayloadType, PayloadType, string>(),
  disconnectPayload: createAsyncAction(
    'DISCONNECT_PAYLOAD_REQUEST',
    'DISCONNECT_PAYLOAD_SUCCESS',
    'DISCONNECT_PAYLOAD_ERROR',
  )<PayloadType, PayloadType, string>(),
};

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
};

export const fetchPowerModuleState = () => async (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(actions.fetchPowerModuleState.request());
  try {
    const response = await ApiService.getPowerModuleState();
    dispatch(actions.fetchPowerModuleState.success(response.data));
  } catch (error) {
    dispatch(actions.fetchPowerModuleState.failure(handleAxiosError(error)));
  }
};

export const connectPayload = (payloadType: PayloadType) => async (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(actions.connectPayload.request(payloadType));
  try {
    await ApiService.connectPayload(payloadType);
    dispatch(actions.connectPayload.success(payloadType));
  } catch (error) {
    dispatch(actions.connectPayload.failure(handleAxiosError(error)));
  }
};

export const disconnectPayload = (payloadType: PayloadType) => async (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(actions.disconnectPayload.request(payloadType));
  try {
    await ApiService.disconnectPayload(payloadType);
    dispatch(actions.disconnectPayload.success(payloadType));
  } catch (error) {
    dispatch(actions.disconnectPayload.failure(handleAxiosError(error)));
  }
};

export type PowerModuleActionTypes = ActionType<typeof actions>;
