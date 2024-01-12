import { useState } from "react"
import {  AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import { RxCross1 } from "react-icons/rx";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const Header = ({ activeHeading }) => {

  const { isAuthenticated } = useSelector((state) => state.user);
  const { allProducts} = useSelector((state) => state.products); 
  const { cart} = useSelector((state) => state.cart); 
  const [search , setSearch] = useState("")
  const [searchData, setSearchData] = useState(null);
  const [seller, setSeller] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);


  console.log("check all:", allProducts)
   const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearch(term);

    const filteredProducts =
      allProducts &&
       allProducts?.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
       );
     console.log("Filtered Products:", filteredProducts)
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
  
    <div className="w-full mx-auto ">
      <div className="w-full hidden 800px:flex items-center justify-between  px-8 ">
        <div>
          {/* Logo */}
            <Link to="/">
            <div className="border-2 border-vintage-primary p-2">
              <h1 className="text-vintage-primary font-extrabold">VINTAGE</h1>
              </div>
            </Link>
        </div>
        {/* Search Box */}

        <div className="w-[50%] relative">
          <input
              type="text"
              placeholder="search here..."
              value={search}
              onChange={handleSearchChange}
              className="h-10 border-2 border-vintage-neutral w-full px-2 rounded-md focus:border-vintage-primary focus:outline-none"
          />
          <AiOutlineSearch
              size={22}
              className="absolute right-2 top-2 cursor-pointer text-vintage-neutral"
          />
          
          {searchData && searchData?.length !== 0 ? (
              <div className="w-full absolute min-h-[30vh] bg-gray-50 shadow-sm-2 z-[9] p-4 rounded-lg">
                {searchData &&
                searchData?.map((i, index) => {
                  const data = i.name;
                  const productName = data.replace(/\s+/g, "-")
                    return (
                      <Link to={`/product/${productName}`} key={index} >
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={``}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
        </div>

        {/* Seller Button */}

         <div className="px-4 py-1 border-2 border-vintage-dark  my-3 flex items-center justify-center rounded-xl cursor-pointer">
            <Link to={`${seller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-vintage-dark flex items-center font-semibold">
                {seller ? "Go Dashboard" : "Seller"}{" "}
              </h1>
            </Link>
          </div>
      </div>
      

        
    </div>

    <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-vintage-dark py-2 `}
      >
        <div
          className={`w-full mx-auto relative flex items-center justify-between`}
        >
          {/* navitems */}
          <div className="flex items-center justify-center w-full">
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">

            <div className="flex items-center">
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="#fff"
                />
                <span className="absolute right-0 top-0 rounded-full bg-red-400 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length || 0} 
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative cursor-pointer mr-[15px]">
                
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      // src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden `}
      >
        <div className="w-full flex items-center justify-between h-16 bg-vintage-dark">
          <div>
            <IoMenu
              size={25}
              className="ml-4 text-vintage-white"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
            <div className="border-2 border-vintage-primary p-1">
              <h1 className="text-vintage-primary font-extrabold">VINTAGE</h1>
              </div>
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-vintage-white"/>
              <span className="absolute right-0 top-0 rounded-full bg-red-400 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length || 0} 
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-full sm:w-[35%] md:w-[45%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll shadow-lg ">
              <div className="w-full justify-between items-center flex py-3 px-4 bg-vintage-dark">
                <div>
          {/* Logo */}
            <Link to="/">
            <div className="border-2 border-vintage-primary p-1">
              <h1 className="text-vintage-primary font-extrabold">VINTAGE</h1>
              </div>
            </Link>
        </div>
                <RxCross1
                  size={20}
                  className="text-vintage-white font-extrabold"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="mx-4 my-8 w-auto m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search here..."
                  onChange={handleSearchChange}
              className="h-10 border-2 border-vintage-neutral w-full px-2 rounded-md focus:border-vintage-primary focus:outline-none"
                  value={search}
                />
               {searchData && searchData.length !== 0 ? (
              <div className="w-auto absolute  min-h-[30vh] bg-gray-50 shadow-sm-2 z-[9] p-4 rounded-lg">
                {searchData &&
                searchData.map((i, index) => {
                  const data = i.name;
                  const productName = data.replace(/\s+/g, "-")
                    return (
                      <Link to={`/product/${productName}`} key={index} >
                        <div className="w-auto flex items-start-py-3">
                          <img
                            src={`${i.image_Url[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
              </div>

              <Navbar active={activeHeading} />
               {/* Seller Button */}

         <div className="mx-4 px-4 py-1 border-2 border-vintage-dark  my-3 flex items-center justify-center rounded-md cursor-pointer">
            <Link to={`${seller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-vintage-dark flex items-center font-semibold">
                {seller ? "Go Dashboard" : "Seller"}{" "}
              </h1>
            </Link>
          </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        // src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/register"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Register
                    </Link>
                  </>
                )}
                
              </div>
            </div>
          </div>
        )}
      </div>
        </>
  )
}

export default Header