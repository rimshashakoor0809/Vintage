import { Link } from "react-router-dom";
import BannerImage from "../../assets/Images/Banner.jpg";

const Banner = () => {
 return (
    <div
      className={`relative min-h-[80vh] 800px:min-h-[100vh] w-full bg-no-repeat flex items-center object-cover`}
      style={{
        backgroundImage:
          `url(${BannerImage})`,
        backgroundSize:"cover"
      }}
    >
      <div className=" w-auto mx-4 sm:w-full sm:mx-14  800px:ml-14 py-2">
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for  <br /> Vintage Vibe
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Discover the Charm of Yesteryear with Handpicked Vintage Finds – Where Nostalgia Meets Modern Style
          
        </p>
        <Link to="/products" className="inline-block">
            <div className="px-5 bg-vintage-dark p-2 my-3 flex items-center justify-center rounded-xl cursor-pointer mt-5">
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
}

export default Banner