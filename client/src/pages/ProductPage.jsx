import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductCard from "../components/Card/ProductCard";
import { productData } from "../static/data";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const products = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(products);
    } else {
      const products = productData && productData.filter(data => data.category === categoryData);
    setData(products);
    }
    //    window.scrollTo(0,0);
  }, [categoryData]);

  return (
  <>
 <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  </>
  );
};

export default ProductsPage;