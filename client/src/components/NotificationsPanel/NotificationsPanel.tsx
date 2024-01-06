import { useSelector } from 'react-redux';
import './NotificationsPanel.css';
import { AppState } from '../../store';
import { useEffect } from 'react';
import { initiateWebSocket, closeWebSocket } from '../../websocket';
import { NotificationType } from '../../types';

const getNotificationTypeStyles = (notification: NotificationType) => {
  switch (notification) {
    case NotificationType.FullCharge:
      return 'full-charge';
    case NotificationType.HighCurrentDraw:
      return 'high-current-draw';
    case NotificationType.LowVoltage:
      return 'low-voltage';
    default:
      return '';
  }
};

const renderNotification = (notification: NotificationType, index: number) => {
  const customStyles = getNotificationTypeStyles(notification);
  return (
    <div key={index} className={`notification ${customStyles}`}>
      {notification}
    </div>
  );
};

const NotificationsPanel = () => {
  const notifications = useSelector((state: AppState) => state.notifications.notifications);

  useEffect(() => {
    initiateWebSocket();
    return closeWebSocket;
  }, []);

  return (
    <div className="notifications">
      <div className="notification-title">Notifications</div>
      {notifications.map(renderNotification)}
    </div>
  );
};

export default NotificationsPanel;
