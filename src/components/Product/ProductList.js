import React, { useState } from 'react';

import ProductItem from './ProductItem';
import ProductDetail from './ProductDetail';
import './ProductList.css';

const ProductList = (props) => {
  const [productIsOpen, setProductIsOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(null);
  const openProductHandler = (productItem) => {
    setProductIsOpen(true);
    setOpenProduct(productItem);
  };
  const closeProductHandler = () => {
    setProductIsOpen(false);
    setOpenProduct(null);
  };
  const content = props.productItems.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      url={product.url}
      name={product.name}
      price={product.price}
      onOpen={openProductHandler}
    />
  ));
  const style = props.className ? props.className : '';
  return (
    <React.Fragment>
      <ul className={style}>{content}</ul>
      {productIsOpen && (
        <ProductDetail
          clickItem={openProduct}
          onClose={closeProductHandler}
          status={props.status}
          title={props.title}
          message={props.message}
        />
      )}
    </React.Fragment>
  );
};

export default ProductList;
