import { useState } from "react";
import Dashboard from "../../pages/Dashboard"
import { categoriesData } from "../../static/data";

const CreateProduct = () => {
    const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  return (
    <Dashboard>
      <div className="mx-5 w-auto">
  
        {/* Header */}

        <div>
        <h3 className="text-[#565656] text-xl mt-2">Create Product</h3>
        <div className="border-t-2 border-vintage-neutral my-4"></div>
      </div>

        <div className="flex flex-row justify-evenly  flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap">

        {/* Form */}
        <div className="w-full ">
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-vintage-black"
              >
                Product Name
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
                htmlFor="price"
                className="block text-base font-medium text-vintage-black"
              >
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  autoComplete="price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
              </div>
              

              {/* Phone Number */}

            <div>
              <label
                htmlFor="category"
                className="block text-base font-medium text-vintage-black"
              >
                Category
              </label>
              <div className="mt-1">
                <select
            className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
              </div>
              </div>
              

              {/* Phone Number */}

            <div>
              <label
                htmlFor="quantity"
                className="block text-base font-medium text-vintage-black"
              >
                Quantity
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="quantity"
                  autoComplete="quantity"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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