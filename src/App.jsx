import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import LoadingSpinner from './components/UI/LoadingSpinner.jsx'

import { fetchCartData, sendCartData } from './store/cart-https.js'
import { retrieveStoredToken } from './store/auth-https.js'
import { cartActions } from './store/cart-slice.js'
import { uiActions } from './store/ui-slice.js'

const AuthPage = React.lazy(() => import('./pages/AuthPage.jsx'))
const ResetPage = React.lazy(() => import('./pages/ResetPage.jsx'))
const Blog = React.lazy(() => import('./pages/Blog.jsx'))
const HomePage = React.lazy(() => import('./pages/HomePage.jsx'))
const ProductPage = React.lazy(() => import('./pages/ProductPage.jsx'))

let initial = true

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const idToken = useSelector((state) => state.auth.idToken)
  const notification = useSelector((state) => state.ui.notification)

  //check if user was login once page reload
  useEffect(() => {
    if (initial) {
      dispatch(retrieveStoredToken())
      initial = false
    }
  }, [dispatch])

  //get localStorage once page reload
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    if (storedCart) {
      dispatch(
        cartActions.replaceCart({
          items: storedCart.items || [],
          totalAmount: storedCart.totalAmount,
          totalQuantity: storedCart.totalQuantity,
        })
      )
    }
  }, [dispatch])

  //post the latest cart data to firebase
  useEffect(() => {
    if (cart.isChanged) {
      dispatch(sendCartData(cart))
      localStorage.setItem('cart', JSON.stringify(cart))
      setTimeout(() => {
        dispatch(uiActions.resetNotification())
      }, 2000)
    }
  }, [cart, dispatch])

  //get firebase data when user is login
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartData(idToken))
      setTimeout(() => {
        dispatch(
          uiActions.showNotification({
            status: '',
            title: '',
            message: '',
          })
        )
      }, 2000)
    }
  }, [dispatch, isLoggedIn, idToken])
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {!isLoggedIn && (
            <Route path="/login" element={<AuthPage />}/>
          )}
          <Route path="/reset-password" element={<ResetPage />}/>
          <Route path="/" element={<HomePage
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />}>

          </Route>
          <Route path="/products" element={<ProductPage
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />}/>
          <Route path="/article/:articleId" element={<Blog />}/>
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
