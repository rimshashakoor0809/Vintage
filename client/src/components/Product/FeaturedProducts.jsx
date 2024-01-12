import { useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../redux/actions/product";
import Spinner from "../Layout/Spinner";

const FeaturedProducts = () => {
  const { isLoading, allProducts } = useSelector(state => state.products);
  const dispatch = useDispatch();

  console.log("products:", allProducts)
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch])

  return (
    <>
      {isLoading ?
        <Spinner /> : <div className="w-auto mx-2 sm:mx-14  ">
          <div className="text-[27px] flex items-center justify-center md:text-start font-[600] pb-[20px] ">
            <h1>Featured Products</h1>
          </div>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[25px] mb-12 p-10 rounded-lg">
            {
              allProducts && allProducts.length !== 0 && (
                <>
                  {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
                </>
              )
            }
          </div>
        </div>}

    </>
  );
}

export default FeaturedProducts