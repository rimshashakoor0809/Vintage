import Checkout from "../components/Checkout/Checkout"
import CheckoutSteps from "../components/Checkout/CheckoutSteps"
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"

const CheckoutPage = () => {
   return (
    <>
        <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </>
  )
}

export default CheckoutPage