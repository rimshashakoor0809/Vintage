import Banner from "../components/Layout/Banner"
import Categories from "../components/Layout/Categories"
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"
import FeaturedProducts from "../components/Product/FeaturedProducts"

const Home = () => {
  return (
    <>
    <Header activeHeading={1} />
      <Banner />
      <Categories />
      <FeaturedProducts />
      <Footer/>
    </>
  )
}

export default Home