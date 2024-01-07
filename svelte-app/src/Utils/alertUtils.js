// utils/alertUtils.js
import { alerts } from '../stores/store.js';

export function addNewAlert(message, bg_color) {
  const newAlert = {
    id: Date.now(),
    bg_color: bg_color,
    message
  };

  // Update the alerts store
  alerts.update(alertList => [...alertList, newAlert]);

  // Optionally, remove the alert after a certain duration
  setTimeout(() => {
    removeAlert(newAlert.id);
  }, 1500); // Adjust the duration as needed
}

export function removeAlert(alertId) {
  // Update the alerts store by filtering out the specified alert
  alerts.update(alertList => alertList.filter(alert => alert.id !== alertId));
}
