import { useState } from "react";
import { Country, State } from "country-state-city";
import ProfilePage from "../../pages/ProfilePage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddressAction, updateUserAddressAction } from "../../redux/actions/user";
import { AiOutlineDelete, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Spinner from "../Layout/Spinner";

const Address = () => {
  const { user, userAddressLoading, userAddressError, deleteUserAddressLoading,deleteUserAddressError } = useSelector((state) => state.user);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  console.log("Check User:", user);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddressAction(
          country,
          city,
          address,
          zipCode,
        )
      );
      if (userAddressError) {
        toast.error(userAddressError)
        return;
      }
      toast.success("Address added successfully.")
      setCountry("");
      setCity("");
      setAddress("");
      setZipCode(0);
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddressAction(id));
    if (deleteUserAddressError) {
      toast.error(deleteUserAddressError);
      return;
    }
    toast.success("Address deleted successfully")
    window.location.reload()
    
  };
 
  return (
    <ProfilePage>

<div className="w-auto mx-5">
      
        {/* Header */}

        <div className="flex flex-row justify-between items-center">
        <h3 className="w-full text-[#565656] text-xl ">Addresses</h3>
        <button
            className="w-auto px-3 py-1 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
            onClick={handleSubmit}
              >
               +
              </button>
      </div>
      <div className="border-t-2 border-vintage-neutral my-4"></div>
      
        <div className="">
          
          {userAddressLoading ? <Spinner /> : 
          <form aria-required  className="w-full">
                <div className="w-full flex-col flex gap-2 p-4">
                  <div>
                    <label className="mb-1 block text-base font-medium text-vintage-black">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block text-base font-medium text-vintage-black" >Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block text-base font-medium text-vintage-black">Address</label>
                    <input
                      type="address"
                       className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <label className="mb-1 block text-base font-medium text-vintage-black">Zip Code</label>
                    <input
                      type="number"
                       className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
          </form>
          }

          
          {user && user?.addresses?.map((item, index) => (
          <div
            className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
            >
            <div className="pl-8 flex items-center">
              <AiOutlineMail size={25} className="mr-2 text-[#565656]"/>
              <h6 className="text-base 800px:text-[unset]">
                {item.address}, {item.city}, {item.country}.
              </h6>
            </div>
              <div className="pl-8 flex items-center">
               { user?.phoneNumber && <AiOutlinePhone size={25} className="mr-2 text-[#565656]"/>} 
              <h6 className="text-base 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className=" flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user?.addresses?.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}

      </div>
  
      
    </div>
    </ProfilePage>
    
  );
}

export default Address