import { useNavigate, useLocation } from 'react-router-dom';
import classes from './ProductSort.module.css';
const ProductSort = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sortAscHandler = () => {
    navigate({
      pathname: location.pathname,
      search: '?sort=asc',
    });
  };
  const sortDesHandler = () => {
    navigate({
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
