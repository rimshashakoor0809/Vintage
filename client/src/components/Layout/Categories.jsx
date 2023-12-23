import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";

const Categories = () => {
  const navigate = useNavigate();
   return (
    <>
      <div
        className="w-auto mx-2 sm:mx-14 my-8 bg-white p-6 rounded-lg mb-12 border border-vintage-neutral"
        id="categories"
       >
         <div className="text-[27px] flex items-center justify-center md:text-start font-[600] pb-[20px] ">
           <h1>Categories</h1>
        </div>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Categories