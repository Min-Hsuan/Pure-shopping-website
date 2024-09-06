import { Link } from 'react-router-dom';
import classes from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer className={classes['footer-outer']}>
      <div className={classes.footer}>
        <div className={classes.logo}>
          <a href="/">P-ure.</a>
          <span>© Copyright P-ure. Inc.</span>
        </div>
        <ul className={classes['grid-col-3']}>
          <li>
            <ul>
              <li>
                <a href="/">ABOUT</a>
              </li>
              <li>
                <Link to="/products">PRODUCTS</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="/">CONTACT US</a>
            <ul className={classes['detail-list']}>
              <li>info＠team.com</li>
              <li>1-800-200-300</li>
            </ul>
          </li>
          <li>
            <p>SIGN UP FOR OUR NEWSLETTER</p>
            <div className={classes.subscribe}>
              <input placeholder="EMAIL" type="email" />
              <button className={classes.button}>SUBSCRIBE</button>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
