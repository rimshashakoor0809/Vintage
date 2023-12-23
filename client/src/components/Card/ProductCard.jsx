import  { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductDetailsCard from "./ProductDetailsCard";

const ProductCard = ({data}) => {
  const [open, setOpen] = useState(false);
 
  return (
    <>
      <div className="w-full h-[370px] bg-vintage-white rounded-lg  p-3 cursor-pointer" style={{boxShadow:"0px 0px 6px #ccc"}}>

        {/* Image */}
        <div>
          <Link to={`/product/${data.name}`} >
          <img
            src={`${data.image_Url && data.image_Url[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        </div>

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
            // onClick={() => addToCartHandler(data._id)}
            color="#565656"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>

        {/* Other Info */}
        <Link to={`/shop/preview/${data?.shop.name}`}>
          <h5 className="text-[16px] text-vintage-primary font-bold pb-3">{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div>
              <h4 className="font-[500] text-[16px] text-vintage-dark  mt-[-4px]">
                Rs. 0.0
              </h4>
          </div>
        </Link>

        
      </div>
    </>
  );
};

export default ProductCard;
