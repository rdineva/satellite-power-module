import { combineReducers } from 'redux';
import powerModuleReducer from './power-module/reducer';
import notificationReducer from './notifications/reducer';

const rootReducer = combineReducers({
  powerModule: powerModuleReducer,
  notifications: notificationReducer,
});

export default rootReducer;