import { useHistory, useLocation } from 'react-router-dom';
import classes from './ProductSort.module.css';
const ProductSort = (props) => {
  const history = useHistory();
  const location = useLocation();

  const sortAscHandler = () => {
    history.push({
      pathname: location.pathname,
      search: '?sort=asc',
    });
  };
  const sortDesHandler = () => {
    history.push({
      pathname: location.pathname,
      search: '?sort=des',
    });
  };

  return (
    <div className={classes.sort}>
      <button
        onClick={sortAscHandler}
        className={props.isSortAscending ? classes.active : ''}
      >
        price:low-high
      </button>
      <button
        onClick={sortDesHandler}
        className={props.isSortDescending ? classes.active : ''}
      >
        price:high-low
      </button>
    </div>
  );
};

export default ProductSort;
