import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProductList from '../components/Product/ProductList.jsx';
import ProductSort from '../components/Product/ProductSort.jsx';

const FIREBASE_DOMIN = import.meta.env.VITE_FIREBASE_DATABASE_URL
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
  const dispatch = useDispatch()
  const [productData, setProductData] = useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const productRes = await fetch(`${FIREBASE_DOMIN}/products.json`)
        if(!productRes) throw new Error('Failed to load product data')
        const productData = await productRes.json()
        setProductData(Object.values(productData))
      }catch(error){
        console.error(error)
      }
    }
    fetchData()
  },[dispatch])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortAscending = queryParams.get('sort') === 'asc';
  const isSortDescending = queryParams.get('sort') === 'des';

  const sortProductList = sortProducts(productData, isSortAscending, isSortDescending);

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
