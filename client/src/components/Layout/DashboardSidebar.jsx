import { AiOutlineLogin } from "react-icons/ai"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"
import { RxPerson } from "react-icons/rx"
import { TbAddressBook } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const items = [
  {
    title: "Dashboard",
    icon: <RxPerson size={20} className="text-vintage-primary font-bold" />,
    path: "/seller/statistics"

  },
  {
    title: "Orders",
    icon: <HiOutlineShoppingBag size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path: "/all-orders"
  },
  {
    title: "Products",
    icon: <TbAddressBook size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path: "/all-products"
  },
  {
    title: "Create Product",
    icon: <TbAddressBook size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path: "/create-product"
  },
  {
    title: "Change Password",
    icon: <RiLockPasswordLine size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path: "/change-password"
  },
  {
    title: "Log out",
    icon: <AiOutlineLogin size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,

  }
]
const DashboardSidebar = () => {

  return (
    <div className="h-full flex flex-col justify-start items-center p-4  gap-2 ">
      {items.map((item, index) => {
        return (<div key={index} className="w-full">
          <SidebarItem item={item} />
        </div>)
      })}
    </div>
  );
}


const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer p-2 rounded-md bg-gray-100 text-[#565656]"
      onClick={() => navigate(`${item.path}`)}
    >
      {item.icon}
      <span
        className="pl-3"
      >
        {item.title}
      </span>
    </div>
  )
}

export default DashboardSidebar