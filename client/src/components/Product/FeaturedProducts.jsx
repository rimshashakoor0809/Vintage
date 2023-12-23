import { useEffect, useState } from "react";
import ProductCard from "../Card/ProductCard";
import { productData } from "../../static/data";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const products = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(products);
  }, [])
  
   return (
    <div>
      <div className="w-auto mx-2 sm:mx-14  ">
        <div className="text-[27px] flex items-center justify-center md:text-start font-[600] pb-[20px] ">
           <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[25px] mb-12 p-10 rounded-lg">
        {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts