import { createReducer } from '@reduxjs/toolkit';
import { addNotifications } from './actions';
import { NotificationState } from '../../types';

const initialState: NotificationState = {
  notifications: [],
  error: null
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder.addCase(addNotifications, (state, action) => {
    state.notifications = action.payload;
  });
});

export default notificationReducer;
