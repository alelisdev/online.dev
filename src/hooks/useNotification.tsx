import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = (type: string, message: string) => {
  switch (type) {
    case 'info':
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case 'warning':
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case 'error':
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
  }
};

export const NotificationContainer = () => {
  return <ToastContainer />;
};
