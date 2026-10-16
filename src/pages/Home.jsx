import HeroSection from '../components/HeroSection.jsx'
import IntroductionSection from '../components/IntroductionSection.jsx'
import ProductCategories from '../components/ProductCategories.jsx'
import FeaturedProduct from '../components/FeaturedProduct.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Gallery from '../components/Gallery.jsx'
import ContactSection from '../components/ContactSection.jsx'
import { usePageTitle } from '../lib/usePageTitle.js'

export default function Home() {
  usePageTitle()
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <ProductCategories />
      <FeaturedProduct />
      <WhyChooseUs />
      <Gallery />
      <ContactSection />
    </>
  )
}
