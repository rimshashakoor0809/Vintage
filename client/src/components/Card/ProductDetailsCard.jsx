import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  
   const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

   return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-10 sm:top-0 md:top-0 lg:top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
           <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-xl shadow-lg relative p-4">
             <div className="flex justify-end">
            <RxCross1
              size={22}
              className=""
              onClick={() => setOpen(false)}
            /> 
             </div>

            <div className="block w-full 800px:flex mt-5 ">
               <div className="w-full 800px:w-[50%]">
                 {/* Image */}
                 <img src={`${data.image_Url && data.image_Url[0]?.url}`} alt="Product Image" />
              </div>

               <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                 
                 {/* Company */}
                 <Link to={`/shop/preview/${data.shop.name}`} className="flex flex-row gap-4 items-center justify-start">
                    <div>
                      <h3 className="text-lg font-bold text-vintage-primary pb-3">
                        {data.shop.name}
                      </h3>
                    </div>
                 </Link>
                 {/* Title & Description*/}
                <h1 className="mb-2 text-[25px] font-[600] text-[#333] ">
                  {data.name}
                </h1>
                 <p>{data.description}</p>
                 {/* Price */}
                <div className="flex">
                  <h3 className="my-2 font-bold text-[18px] text-vintage-black">
                    Rs. 0.0
                  </h3>
                 </div>
                 
                 {/* Quantity Counter */}
                <div className="my-2 flex items-center justify-between pr-3">
                  <div>
                    <button
                      className="bg-vintage-primary rounded-md text-white font-bold  px-4 py-2  hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className=" text-gray-800 font-medium px-4 py-2">
                      {count}
                    </span>
                    <button
                      className="bg-vintage-primary rounded-md text-white font-bold  px-4 py-2  hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className="w-[150px] bg-vintage-dark my-3 justify-center rounded-xl cursor-pointer mt-6 h-11 flex items-center"
                  // onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                   <AiOutlineShoppingCart className="mr-1" /> Add to cart 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductDetailsCard