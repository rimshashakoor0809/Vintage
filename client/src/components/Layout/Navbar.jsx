import { Link } from "react-router-dom"
import { navItems } from "../../static/data"

const Navbar = ({ active }) => {
  
  return (
   <div className="block 800px:flex items-center">
         {
       navItems && navItems.map((data, index) => ( <div className="flex mx-4 " key={index}>
           <Link to={data.url}
             className={`${active === index + 1 ? "text-vintage-primary 800px:text-vintage-primary" : "text-vintage-dark 800px:text-vintage-white"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
           >
             {data.title}
           </Link>
         </div>
       ))
         }
    </div>
  )
}

export default Navbar