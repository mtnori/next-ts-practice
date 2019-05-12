import React from 'react';
import NotificationSystem from 'react-notification-system';

const NotificationContext = React.createContext<{
  addNotification: (notification: NotificationSystem.Notification) => void;
}>({
  addNotification: () => {}
});
export default NotificationContext;
