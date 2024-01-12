import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {

  const { cart } = useSelector((state) => state.cart);
  const [grandPrice, setGrandPrice] = useState(0);
  const dispatch = useDispatch();


  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartAction(data));
  };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0
  // );

  const quantityChangeHandler = (data) => {
    dispatch(addToCartAction(data));
  };

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach(product => {
      const productTotalPrice = product.price * product.qty;
      totalPrice += productTotalPrice;
    });
    setGrandPrice(totalPrice);

  }, [cart])

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[35%] md:w-[45%] bg-white flex flex-col overflow-y-scroll justify-between shadow-md">
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
            {cart && cart.length === 0 ? (<div className="w-full h-full flex items-center justify-center">
                <h3 className="text-lg font-semibold">Cart is Empty!</h3>
            </div>) :
              (
                <div className="w-full">
                  {cart &&
                    cart?.map((cart, index) => (
                      <CartSingle
                        key={index}
                        data={cart}
                        quantityChangeHandler={quantityChangeHandler}
                        removeFromCartHandler={removeFromCartHandler}
                      />
                    ))}
                </div>
              )

            }

          </div>

          {/* Cart Information */}

          {cart && cart.length != 0 && 
            <div>

            
            <div className="flex flex-col border border-vintage-neutral mx-4 my-2 p-4 gap-1">

              {/* total */}
              <div className="flex flex-row justify-between items-center">
                <p className="">Total:</p>
                <p className="">Rs. {grandPrice}</p>
              </div>
              {/* delivery fee */}
              <div className="flex flex-row justify-between items-center">
                <p className="">Delivery Fee:</p>
                <p className="">Rs. 150</p>
              </div>
              {/* grand total */}
              <div className="flex flex-row justify-between items-center">
                <p className="font-bold">Grand Total:</p>
                <p className="font-bold">Rs. {grandPrice + 150}</p>
              </div>
            </div>

            {/* checkout buttons */}
            <Link to="/checkout">
              <div
                className={`mx-4 h-[40px] flex items-center justify-center w-auto bg-vintage-dark rounded-lg  my-4`}
              >
                <h1 className="text-vintage-white">
                  Checkout
                </h1>
              </div>
            </Link>
          </div>
          }

          
        </>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.price * value;

  const increment = (data) => {
    if (data.stock <= value) {
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
    <div className="p-4  rounded-lg mx-4 my-2 shadow-lg ">
      <div className="w-full flex items-center gap-3 ">
        {/* Image */}
        <img
          src={``}
          alt=""
          className=" w-20 h-20 object-cover"
        />
        <div className=" w-full">
          {/* Title */}
          <p className="text-sm ">{data?.name}</p>
          <div className="flex flex-row items-center justify-between">

            <AiOutlineDelete size={22} className="text-red-500" onClick={removeFromCartHandler} />
            <div>
              {/* Price */}
              <p className="text-vintage-light">Rs. {totalPrice}</p>
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
