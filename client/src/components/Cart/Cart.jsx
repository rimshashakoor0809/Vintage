import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartData } from "../../static/data";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = ({ setOpenCart }) => {

  const [cart, setCart] = useState(cartData);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[35%] md:w-[45%] bg-white flex flex-col overflow-y-scroll justify-between shadow-md">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center " >
             <div className="flex w-full justify-between p-4 items-center bg-vintage-dark">
                <h1 className="font-semibold text-vintage-white">Shopping Cart</h1>
                <RxCross1
                  size={20}
                  className="cursor-pointer text-vintage-white"
                  onClick={() => setOpenCart(false)}
                />
              </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-between p-4 items-center bg-vintage-dark">
                <h1 className="font-semibold text-vintage-white">Shopping Cart</h1>
                <RxCross1
                  size={20}
                  className="cursor-pointer text-vintage-white"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                    // quantityChangeHandler={quantityChangeHandler}
                    // removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
              </div>
            
              {/* Cart Information */}

              <div>

                <div className="flex flex-col border border-vintage-neutral mx-4 my-2 p-4 gap-1">

                  {/* total */}
                  <div className="flex flex-row justify-between items-center">
                    <p className="">Total:</p>
                    <p className="">Rs. 3549</p>
                  </div>
                  {/* delivery fee */}
                  <div className="flex flex-row justify-between items-center">
                    <p className="">Delivery Fee:</p>
                    <p className="">Rs. 150</p>
                  </div>
                  {/* grand total */}
                  <div className="flex flex-row justify-between items-center">
                    <p className="font-bold">Grand Total:</p>
                    <p className="font-bold">Rs. 3649</p>
                  </div>
                </div>
                
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`mx-4 h-[40px] flex items-center justify-center w-auto bg-vintage-dark rounded-lg`}
                >
                  <h1 className="text-vintage-white">
                    Checkout
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="p-4  rounded-lg mx-4 my-2 shadow-lg">
      <div className="w-full flex items-center gap-2">
        {/* Image */}
        <img
          src={`${data?.image_Url[0]?.url}`}
          alt=""
          className=" w-20 h-20 object-cover"
        />
        <div>
          {/* Title */}
          <p className="text-sm ">{data.name}</p>
          <div className="flex flex-row items-center justify-between">

            <AiOutlineDelete size={22} className="text-red-500"/>
            <div>
            {/* Price */}
              <p className="text-vintage-light">Rs. 3456</p>
              {/* Quantity Increment */}
              <div className=" flex flex-row justify-start items-center py-1">
                <div
                  className="bg-vintage-primary text-vintage-white rounded-full w-5 h-5  cursor-pointer flex justify-center items-center"
                  onClick={() => decrement(data)}
                >
                  -
                </div>

                <span className="px-2">{data.qty || 0}</span>

                <div
                  className="bg-vintage-primary text-vintage-white  rounded-full w-5 h-5 cursor-pointer flex justify-center items-center"
                  onClick={() => increment(data)}
                >
                  +
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
