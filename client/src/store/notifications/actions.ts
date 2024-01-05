import { createAction } from '@reduxjs/toolkit';
import { NotificationType } from '../../types';

export const addNotifications = createAction('ADD_NOTIFICATIONS', (notifications: NotificationType[]) => ({
  payload: notifications,
}));
