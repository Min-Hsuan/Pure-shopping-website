import { Fragment, useEffect,useState } from 'react'
import Banner from '../components/UI/Banner.jsx'
import skinCareImage from '../assets/kalos-skincare.jpg'
import bannerImage from '../assets/home-page-banner.jpg'
import ProductSection from '../components/Product/ProductSection.jsx'
import ArticleSection from '../components/Article/ArticleSection.jsx'


import ReviewSection from '../components/Reviews/ReviewSection.jsx'


import { useDispatch } from 'react-redux'
import { cartActions } from '../store/cart-slice.js'
import { uiActions } from '../store/ui-slice.js'
const FIREBASE_DOMIN = import.meta.env.VITE_FIREBASE_DATABASE_URL

const HomePage = (props) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [articles, setArticles] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      setIsLoading(true)
      try{
        const [productRes, articleRes, reviewRes] = await Promise.all([
          fetch(`${FIREBASE_DOMIN}/products_index.json`),
          fetch(`${FIREBASE_DOMIN}/articles.json`),
          fetch(`${FIREBASE_DOMIN}/reviews.json`)
        ])
        if(!productRes.ok || !articleRes.ok || !reviewRes.ok){
          throw new Error('Failed to load data for homepage')
        }
        const [productData, articleData, reviewData] = await Promise.all([
          productRes.json(),
          articleRes.json(),
          reviewRes.json()
        ])
        setProducts(Object.values(productData))
        setArticles(Object.values(articleData))
        setReviews(Object.values(reviewData))
      }catch(error){
        dispatch(uiActions.showNotification({
          status: 'error',
          title: 'Loading Failed',
          message: 'Failed to load data for products'
        }))
      }finally{
        setIsLoading(false)
      }
    }
    fetchData()
  },[dispatch])
  const addFreeHandler = () => {
    dispatch(
      cartActions.addItem({
        id: '9',
        url: picture3,
        name: 'Free Aenean sit amet tortor molestie 3ml',
        price: 0,
        amount: 1,
      })
    )
  }
  return (
    <Fragment>
      <Banner src={bannerImage} alt="The product picture." />
      <ProductSection
        textContent={{
          paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel pellentesque turpis, lacinia pretium mauris. Cras lacinia erat sed leo tristique condimentum nec id metus.',
          title: 'Go back to pure',
        }}
        productItems={products}
        status={props.status}
        title={props.title}
        message={props.message}
      />

      <Banner
        src={skinCareImage}
        alt="Girl smile with the product."
        title="Understand your skin and its complex needs."
        onAction={addFreeHandler}
        actionText="GET IT FOR FREE"
      />
      <ArticleSection articles={articles} />
      <hr className="hr-middle" />
      <ReviewSection reviews={reviews} title="Reviews" />
    </Fragment>
  )
}

export default HomePage
