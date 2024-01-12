import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCartAction } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProductsAction } from "../../redux/actions/product";

const ProductDetailsPage = () => {

  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllSellerProductsAction(id));
  }, [dispatch, id]);

  console.log("Check Productssss:", products)
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };



  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCartAction(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  
  return (
    <div className="bg-white">
      {data ? (
        <div className={`w-full mx-auto  800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={``}
                  alt=""
                  className="w-[80%]"
                />
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`text-[25px] font-[600] text-[#333]`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h3 className={``}>
                    {data.price && "Rs." + data.price }
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className={`w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !mt-6`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`pt-3 text-[15px] text-vintage-primary`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
      
        </div>
      ) : null}
    </div>
  );
}




export default ProductDetailsPage