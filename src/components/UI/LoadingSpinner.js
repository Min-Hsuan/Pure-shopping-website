import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = ()=>{
  return <div >
    <AiOutlineLoading3Quarters className={classes.spinner} />
  </div>
}

export default LoadingSpinner;