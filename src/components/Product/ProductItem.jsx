import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = React.memo((props)=>{
  const {id, name, price, url} = props;
  const transformedPrice = price.toFixed(2);

  const openDetailHandler=()=>{
    props.onOpen({
      id,
      name,
      price,
      url,
      amount: 1
    })
  }

  return <li className={classes['product-item']}>
    <img loading="lazy" src={url} alt={name} />
    <span className={classes['product-name']} >{name}</span>
    <span className={classes['product-price']} >{`—${transformedPrice}$`}</span>
    <button className={classes.button} onClick={openDetailHandler}>Quick View</button>
  </li>
});

export default ProductItem;