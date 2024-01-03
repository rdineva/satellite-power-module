import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { PayloadType } from '../types';
import { PowerModuleState } from '../types';
import { PowerModuleActionTypes, actions } from './actions';

const initialState: PowerModuleState = {
  payloads: {
    [PayloadType.obc]: { batteryVoltage: 0, currentDraw: 0, connected: false },
    [PayloadType.camera]: { batteryVoltage: 0, currentDraw: 0, connected: false }
  },
  error: null
};

function fetchPowerModuleState(state = initialState.payloads, action: PowerModuleActionTypes) {
  switch (action.type) {
    case getType(actions.fetchPowerModuleState.success):
      return action.payload;
    default:
      return state;
  }
}

function connectPayload(state = initialState.payloads, action: PowerModuleActionTypes) {
  switch (action.type) {
    case getType(actions.connectPayload.success):
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          connected: true
        }
      };
    default:
      return state;
  }
}

function disconnectPayload(state = initialState.payloads, action: PowerModuleActionTypes) {
  switch (action.type) {
    case getType(actions.disconnectPayload.success):
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          connected: false,
          currentDraw: 0,
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  fetchPowerModuleState,
  connectPayload,
  disconnectPayload
});
