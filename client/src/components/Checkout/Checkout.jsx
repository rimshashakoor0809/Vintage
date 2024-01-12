import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";


const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const navigate = useNavigate();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

   const paymentSubmit = () => {
   if( address === ""  || zipCode === null || country === "" || city === ""){
     toast.error("Please choose your delivery address!")
     return;
   } else{
    const shippingAddress = {
      address,
      zipCode,
      country,
      city,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      shippingAddress,
      user,
    }

    // update local storage with the updated orders array
    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
   }
  };

  // this is shipping cost variable
  const shipping = 150;

  const totalPrice = subTotalPrice + shipping;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            totalPrice={totalPrice}
            subTotalPrice={subTotalPrice}
          />
        </div>
      </div>
      <div>
      <button
      onClick={paymentSubmit}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
              >
                Go to Payment
              </button>

      </div>
    </div>
  );
}

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address,
  setAddress,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form >

        <div className="flex flex-col gap-3">
          <div className="w-full">
            <label
              className="mb-1 block text-base font-medium text-vintage-black"
            >Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
            />
          </div>
          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
            />
          </div>


          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
            />
          </div>
          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >Zip Code</label>
            <input
              type="number"
              value={user?.addresses[0]?.zipCode || zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm" />
          </div>


          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >Country</label>
            <select
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm" value={user?.addresses[0]?.country || country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >City</label>
            <select
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
              value={user?.addresses[0]?.city || city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>


          <div className="w-full">
            <label className="mb-1 block text-base font-medium text-vintage-black"
            >Address</label>
            <input
              type="address"
              required
              value={user?.addresses[0]?.address || address}
              onChange={(e) => setAddress(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm" />
          </div>

        </div>

      </form>
      
    </div>
  );
};

const CartData = ({
  totalPrice,
  subTotalPrice,
}) => {
  return (
    <div className="w-full rounded-md p-5" style={{boxShadow:"0px 0px 5px #ccc"}}>
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Sub Total:</h3>
        <h5 className="text-[18px] font-[600]"> {subTotalPrice === 0 ? "-" : `Rs. ${subTotalPrice}`}</h5>
      </div>

      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">{subTotalPrice === 0 ? "-" : "Rs. 150" }</h5>
      </div>
                      <div className="border-t-2 border-vintage-neutral my-4"></div>

      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Grand Total:</h3>
        <h5 className="text-[18px] font-[600]"> {subTotalPrice === 0 ? "-" : `Rs. ${totalPrice}`}</h5>
      </div>
    </div>
  );
};

export default Checkout