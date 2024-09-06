import {AiFillStar} from 'react-icons/ai';
import classes from './ReviewItem.module.css';

const ReviewItem = (props)=>{
  return <li className={classes['review-item']}>
    <div className={classes.info}>
      <span className={classes['user-name']}>{props.user}</span>
      <span className={classes.date}>{`Reviewed on ${props.date}`}</span>
    </div>
    <div className={classes.comment}>
      <ul>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
      </ul>
      <p >{props.comment}</p>
    </div>
  </li>
};

export default ReviewItem;