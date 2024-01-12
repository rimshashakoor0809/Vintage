import { useEffect, useState } from "react";
import Dashboard from "../../pages/Dashboard"
import { useSelector } from "react-redux";

const SellerProfile = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const { seller } = useSelector(state => state.seller);
  useEffect(() => {
    
    setName(seller?.name || "")
    setDescription(seller?.description || "")
    setPhoneNumber(seller?.phoneNumber || "")
    setZipCode(seller?.zipCode || "");
    setEmail(seller?.email || "");
    setAddress(seller?.address || "")

  }, [seller])
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data:", name, description, phoneNumber, address, zipCode);
  }
  return (
    <Dashboard>
      <div className="mx-5 w-auto">

        {/* Header */}

        <div>
          <h3 className="text-[#565656] text-xl mt-2">Profile Settings</h3>
          <div className="border-t-2 border-vintage-neutral my-4"></div>
        </div>

        <div className="flex flex-row justify-evenly  flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap">

          {/* Form */}
          <div className="w-full ">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-vintage-black"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-vintage-black"
                >
                 Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                  />
                </div>
              </div>

              {/* Description*/}
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-medium text-vintage-black"
                >
                  Description
                </label>
                <div className="mt-1">

                  <textarea
                    cols="30"
                    required
                    rows="8"
                    type="text"
                    name="description"
                    value={description}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
              </div>


              {/* Phone Number */}

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-base font-medium text-vintage-black"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phoneNumber"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                  />
                </div>
              </div>

               {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-base font-medium text-vintage-black"
                >
                  Address
                </label>
                <div className="mt-1">

                  <textarea
                    cols="30"
                    required
                    rows="2"
                    type="text"
                    name="address"
                    value={address}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your product description..."
                  ></textarea>
                </div>
              </div>

               {/* Zip Code */}

              <div>
                <label
                  htmlFor="code"
                  className="block text-base font-medium text-vintage-black"
                >
                  Zip Code
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="code"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                  />
                </div>
              </div>
             

              

          

              
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>


      </div>
    </Dashboard>
  )
}

export default SellerProfile