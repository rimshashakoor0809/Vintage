import { useState } from "react";
import Dashboard from "../../pages/Dashboard"
import { categoriesData } from "../../static/data";
import { createProductAction } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const CreateProduct = () => {
  
  return (
    <Dashboard>
      <div className="mx-5 w-auto">

        {/* Header */}

        <div>
          <h3 className="text-[#565656] text-xl mt-2">Create Product</h3>
          <div className="border-t-2 border-vintage-neutral my-4"></div>
        </div>

       
        <div className="flex flex-row justify-evenly my-14 flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap">

        {/* Image */}
            <div className="flex flex-col gap-5 justify-start items-center w-full sm:w-full  md:w-1/3 lg:w-1/3 ">
              <img
                // src={`${user?.avatar?.url}`}
                className="p-14 rounded-full object-cover border-[3px] border-vintage-primary"
                alt=""
              />
              <div>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  // onChange={handleImage}
            />
            <label htmlFor="image" className="bg-vintage-neutral rounded-md p-2">
              Upload File
            </label>
              </div>
          </div>
        {/* Form */}
        <div className="w-full py-5 md:px-5 md:py-0 sm:py-0">
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-vintage-black"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
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
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>
            {/* Phone Number */}

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-vintage-black"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

export default CreateProduct