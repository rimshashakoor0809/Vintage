import { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../redux/actions/product";
import Spinner from "../components/Layout/Spinner";

const ProductsPage = () => {
  // const [searchParams] = useSearchParams();
  // const categoryData = searchParams.get("category");
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (categoryData === null) {
  //     const products = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
  //   setData(products);
  //   } else {
  //     const products = productData && productData.filter(data => data.category === categoryData);
  //   setData(products);
  //   }
  //   //    window.scrollTo(0,0);
  // }, [categoryData]);

   const { isLoading, allProducts } = useSelector(state => state.products);
  const dispatch = useDispatch();

  console.log("products:", allProducts)
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch])

  return (
  <>
 <div>
      <Header activeHeading={3} />
      <br />
        <br />
        {isLoading ? <Spinner /> : 
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {allProducts && allProducts.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
        }
      <Footer />
    </div>
  </>
  );
};

export default ProductsPage;
