import  { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";
import ShopDetails from "../Shop/ShopDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../redux/actions/cart";
import { toast } from 'react-toastify';


const ProductCard = ({data}) => {
  const [open, setOpen] = useState(false);
  const [openShopModal, setOpenShopModal] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCartAction(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
 
  return (
    <>
      <div className="w-full h-[370px] bg-vintage-white rounded-lg  p-3 cursor-pointer"
        style={{ boxShadow: "0px 0px 6px #ccc" }}
      >

        {/* Image */}
        <Link to={`/product/${data?._id}`}>
          {console.log(`Image Path: ${import.meta.env.VITE_BACKEND_IMAGE_BASE_URL}${data?.images[0]}`)}
          <img
            src={`${import.meta.env.VITE_BACKEND_IMAGE_BASE_URL}${data?.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* Cart + View */}
        <div className="flex flex-row items-center justify-end gap-2 my-2 ">
          <SlMagnifier
            size={25}
            className="cursor-pointer "
            onClick={() => setOpen(!open)}
            color="#565656"
            title="Quick view"
          />
          <BsBag
            size={25}
            className="cursor-pointer"
            onClick={() => addToCartHandler(data._id)}
            color="#565656"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        {/* Other Info */}
        <div >
          <h5 className="text-[16px] text-vintage-primary font-bold pb-3" onClick={() => setOpenShopModal(true)}>{data.shop.name}</h5>
          {/* {openShopModal ? <ShopDetails open={openShopModal} setOpenShopModal={setOpenShopModal} shop={data?.shop } /> : null} */}

        </div>
        <Link to={`/product/${data?._id}`} >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div>
              <h4 className="font-[500] text-[16px] text-vintage-dark  mt-[-4px]">
                Rs. {data?.price || 0.0}
              </h4>
          </div>
        </Link>

        
      </div>
    </>
  );
};

export default ProductCard;
