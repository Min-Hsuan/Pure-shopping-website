import { Link } from 'react-router-dom';
import classes from './Headline.module.css';

const HeadLine = (props)=>{
  return <div className={classes.headline}>
    <h2 className={classes.title}>{props.title}</h2>
    {props.paragraph && <p>{props.paragraph}</p>}
    {props.link && <Link to={`/article/${props.link}`} >Learn more</Link>}
  </div>
}

export default HeadLine;