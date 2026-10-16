import { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Credits = lazy(() => import('./pages/Credits.jsx'))

/** Scroll to #hash targets (also across routes), otherwise to the top on navigation. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef(pathname)
  useEffect(() => {
    // Smooth (via CSS) within a page; jump instantly when arriving from another page
    const behavior = lastPath.current === pathname ? undefined : 'instant'
    lastPath.current = pathname
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView({ behavior })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a
        href="#main"
        className="fixed top-2 left-2 z-[60] -translate-y-20 bg-ink px-4 py-3 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <div id="page-content">
        <m.main
          id="main"
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Suspense fallback={<div className="min-h-screen" />}>
            <Outlet />
          </Suspense>
        </m.main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  )
}
