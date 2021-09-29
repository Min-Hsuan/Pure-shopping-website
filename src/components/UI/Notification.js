import classes from './Notification.module.css';

const Notification = (props) => {
  return (
    <div className={classes.notification}>
      <p>{props.message}</p>
    </div>
  );
};

export default Notification;