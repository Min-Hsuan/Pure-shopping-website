import { Link } from 'react-router-dom';
import classes from './Banner.module.css';

const Banner = (props) => {
  return (
    <section className={classes.banner}>
      <img src={props.src} alt={props.alt} />
      <div className={classes['text-box']}>
        {props.title && <h3 className={classes.title}>{props.title}</h3>}
        {props.linkText && (
          <Link to="/" className={classes.link}>
            {props.linkText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Banner;
