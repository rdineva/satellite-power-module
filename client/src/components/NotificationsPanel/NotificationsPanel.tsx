import './NotificationsPanel.css';

interface NotificationsPanelProps {
  notifications: string[];
}

const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => {
  return (
    <div className="notifications">
      <div className="title">Notifications</div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
}

export default NotificationsPanel;
