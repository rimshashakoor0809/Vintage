import { RxPerson } from "react-icons/rx";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Profile",
    icon: <RxPerson size={20} className="text-vintage-primary font-bold" />,
    path:"/profile"
    
  },
   {
    title: "Orders",
     icon: <HiOutlineShoppingBag size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path:"/all-orders"
  },
    {
    title: "Addresses",
      icon: <TbAddressBook size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path:"/address"
  },
     {
    title: "Change Password",
       icon: <RiLockPasswordLine size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,
    path:"/change-password"
  },
     {
    title: "Log out",
       icon: <AiOutlineLogin size={20} className="text-vintage-primary font-bold hover:text-vintage-dark" />,

  }
]

const ProfileSidebar = () => {
    return (
      <div className="h-full flex flex-col justify-start items-center p-4  gap-2 ">
        {items.map((item, index) => {
          return (<div key={index} className="w-full">
            <SidebarItem data={item}/>
          </div>)
        })}

      {/* {"Admin" === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "red" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[red]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )} */}
    </div>
  );
}


const SidebarItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer p-2 rounded-md bg-gray-100 text-[#565656]"
      onClick={()=>navigate(`${data.path}`)}
    >
      {data.icon}
        <span
          className="pl-3"
        >
          {data.title}
        </span>
      </div>
  )
}
export default ProfileSidebar