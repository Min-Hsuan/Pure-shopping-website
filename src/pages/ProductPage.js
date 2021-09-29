import ProductList from '../components/Product/ProductList';
import picture1 from '../assets/Mask Group-1.jpg';
import picture2 from '../assets/Mask Group-2.jpg';
import picture3 from '../assets/Mask Group-3.jpg';
import picture4 from '../assets/Mask Group-4.jpg';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductSort from '../components/Product/ProductSort';
const productDatas = [
  {
    id: '1',
    url: picture1,
    name: 'Nam placerat nulla ut',
    price: 15.5,
  },
  {
    id: '2',
    url: picture2,
    name: 'Morbi suscipit nunc consequat odio',
    price: 20.0,
  },
  {
    id: '3',
    url: picture3,
    name: 'Nunc quis tortor et sem volutpat',
    price: 10.5,
  },
  {
    id: '4',
    url: picture4,
    name: 'Aenean sit amet tortor molestie',
    price: 15.5,
  },
  {
    id: '5',
    url: picture1,
    name: 'Nam placerat nulla ut',
    price: 12.5,
  },
  {
    id: '6',
    url: picture2,
    name: 'Morbi suscipit nunc consequat odio',
    price: 5.0,
  },
  {
    id: '7',
    url: picture3,
    name: 'Nunc quis tortor et sem volutpat',
    price: 30.5,
  },
  {
    id: '8',
    url: picture4,
    name: 'Aenean sit amet tortor molestie',
    price: 20.5,
  },
];

const sortProducts = (products, isSortAscending,isSortDescending) => {
  return products.sort((itemA, itemB) => {
    if (isSortAscending) {
      return itemA.price - itemB.price;
    } else if(isSortDescending) {
      return itemB.price - itemA.price;
    }else{
      return itemA.id > itemB.id ? 1 : -1
    }
  });
};
const ProductPage = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortAscending = queryParams.get('sort') === 'asc';
  const isSortDescending = queryParams.get('sort') === 'des';

  const sortProductList = sortProducts(productDatas, isSortAscending, isSortDescending);

  return (
    <React.Fragment>
      <ProductSort isSortAscending={isSortAscending} isSortDescending={isSortDescending} />
      <ProductList
        productItems={sortProductList}
        className={['product-list']}
        status={props.status}
        title={props.title}
        message={props.message}
      />
    </React.Fragment>
  );
};

export default ProductPage;
