import classes from './Notification.module.css';

const Notification = (props) => {
  const statusClass = classes[props.className]
  return (
    <div className={`${classes.notification} ${statusClass}`}>
      <p>{props.message}</p>
    </div>
  );
};

export default Notification;