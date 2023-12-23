import { useState } from "react"
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"
import ProfileSidebar from "../components/Profile/ProfileSidebar"

const ProfilePage = ({children}) => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <div className="m-4 w-auto flex flex-wrap md:flex-nowrap md:flex-row gap-3 pb-14 pt-5 ">
            <div className="w-full md:w-[335px] lg:w-[335px] sticky rounded-lg" style={{boxShadow:"0px 0px 4px #ccc"}}>
              <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-full p-4 overflow-y-scroll rounded-lg my-6 md:my-0 "
        style={{boxShadow:"0px 0px 4px #ccc"}}>
            {children}
        </div>
          </div>
      <Footer/>
    </>
  )
}

export default ProfilePage