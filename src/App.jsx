import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/common/CartDrawer'
import ScrollToTop from './components/ui/ScrollToTop'
import { useScrollToTop } from './hooks/useScrollToTop'

// Eager-loaded pages (above the fold)
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Lazy-loaded routes for performance
const Menu = lazy(() => import('./pages/Menu'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Deals = lazy(() => import('./pages/Deals'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Branches = lazy(() => import('./pages/Branches'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
    </div>
  )
}

function ScrollToTopRoute() {
  useScrollToTop()
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTopRoute />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={
                <>
                  <Helmet>
                    <title>FoodHub - Delicious Food Delivered Fast</title>
                    <meta name="description" content="Order delicious fast food online. Pizza, Burgers, Wraps, Pasta and more delivered hot and fast to your doorstep." />
                  </Helmet>
                  <Home />
                </>
              } />
              <Route path="/menu" element={
                <>
                  <Helmet>
                    <title>Menu - FoodHub</title>
                    <meta name="description" content="Explore our full menu of delicious food. Pizza, Burgers, Wraps, Pasta, Sides, Drinks and Desserts." />
                  </Helmet>
                  <Menu />
                </>
              } />
              <Route path="/product/:id" element={
                <>
                  <Helmet>
                    <title>Product - FoodHub</title>
                  </Helmet>
                  <ProductDetail />
                </>
              } />
              <Route path="/deals" element={
                <>
                  <Helmet>
                    <title>Deals & Offers - FoodHub</title>
                    <meta name="description" content="Save big with our exclusive combo deals and limited time offers." />
                  </Helmet>
                  <Deals />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Helmet>
                    <title>Cart - FoodHub</title>
                  </Helmet>
                  <Cart />
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Helmet>
                    <title>Checkout - FoodHub</title>
                  </Helmet>
                  <Checkout />
                </>
              } />
              <Route path="/order-confirmation/:orderNumber" element={
                <>
                  <Helmet>
                    <title>Order Confirmation - FoodHub</title>
                  </Helmet>
                  <OrderConfirmation />
                </>
              } />
              <Route path="/login" element={
                <>
                  <Helmet>
                    <title>Login - FoodHub</title>
                  </Helmet>
                  <Login />
                </>
              } />
              <Route path="/profile" element={
                <>
                  <Helmet>
                    <title>My Account - FoodHub</title>
                  </Helmet>
                  <Profile />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Helmet>
                    <title>About Us - FoodHub</title>
                    <meta name="description" content="Learn about FoodHub's story, values, and the team behind your favorite meals." />
                  </Helmet>
                  <About />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Helmet>
                    <title>Contact Us - FoodHub</title>
                  </Helmet>
                  <Contact />
                </>
              } />
              <Route path="/branches" element={
                <>
                  <Helmet>
                    <title>Our Branches - FoodHub</title>
                  </Helmet>
                  <Branches />
                </>
              } />
              <Route path="/faq" element={
                <>
                  <Helmet>
                    <title>FAQ - FoodHub</title>
                  </Helmet>
                  <FAQ />
                </>
              } />
              <Route path="/privacy" element={
                <>
                  <Helmet>
                    <title>Privacy Policy - FoodHub</title>
                  </Helmet>
                  <Privacy />
                </>
              } />
              <Route path="/terms" element={
                <>
                  <Helmet>
                    <title>Terms & Conditions - FoodHub</title>
                  </Helmet>
                  <Terms />
                </>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  )
}
