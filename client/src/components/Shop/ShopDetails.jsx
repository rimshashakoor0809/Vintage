import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx"
import ProductCard from "../Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerProductsAction } from "../../redux/actions/product";
import Spinner from "../Layout/Spinner";

const ShopDetails = ({ open, setOpenShopModal, shop }) => {

  const { isLoading, products } = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSellerProductsAction(shop._id));
  }, [dispatch])

  console.log("Products check 11:", products);
  return (

    <>

      {/* {isLoading ? <Spinner /> :
        
      } */}
      <div className="bg-[#fff]">
          <div className="fixed w-full h-screen top-10 sm:top-0 md:top-0 lg:top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center ">
            <div className="w-[90%] 800px:w-[60%] top-5 h-[80vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-xl shadow-lg relative p-4 " style={{ boxShadow: "0px 0px 10px #ccc" }}>
              <div className="flex justify-end">
                <RxCross1
                  size={22}
                  className=""
                  onClick={() => setOpenShopModal(false)}
                />
              </div>

              <div className="block w-full    mt-5  ">
                <div className="w-full">
                  {/* Image */}
                  {/* <img src={``} alt="Product Image" /> */}
                </div>

                <div className="w-full pt-5 pl-[5px] pr-[5px]">

                  {/* Title & Description*/}
                  <h1 className="mb-2 text-[25px] font-[600] text-[#333] ">
                    {shop?.name || ""}
                  </h1>
                  {shop?.description && <p>{shop?.description}</p>}


                  {/* information */}

                  <div className="flex border border-[#ccc] my-3 p-4 rounded-lg flex-col gap-2">

                    {/* Phone Number */}

                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-vintage-black">
                        Phone Number
                      </h3>
                      <p>{shop?.phoneNumber} </p>
                    </div>

                    {/*Address  */}

                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-vintage-black">
                        Address
                      </h3>
                      <p>{shop?.address || "-"} </p>
                    </div>

                    {/*Total Products  */}

                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-vintage-black">
                        Total products
                      </h3>
                      {/* <p>{products?.length} </p> */}
                    </div>


                    {/*Joined on  */}

                    <div className="flex flex-col">
                      <h3 className="font-bold text-base text-vintage-black">
                        Joined On
                      </h3>
                      <p>{shop?.createdAt?.slice(0, 10)} </p>
                    </div>
                  </div>


                  {/* Products */}

                  <h1 className="mb-2 text-[18px] font-[600] text-[#333] ">
                    Products
                  </h1>
                  <div className=" grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[25px] mb-12  rounded-lg">
                    {/* {
                      products && products.length !== 0 && (
                        <>
                          {products && products.map((i, index) => <ProductCard data={i} key={index}  />)}
                        </>
                      )
                    } */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ShopDetails