import DashboardHeader from "../components/Layout/DashboardHeader"
import DashboardSidebar from "../components/Layout/DashboardSidebar"

const Dashboard = ({children}) => {
  return (
    <>
      <DashboardHeader />
      <div className="h-full  m-4 w-auto flex flex-wrap md:flex-nowrap md:flex-row gap-3 ">
            <div className="h-full w-full md:w-[335px] lg:w-[335px] sticky rounded-lg" style={{boxShadow:"0px 0px 4px #ccc"}}>
              <DashboardSidebar />
        </div>
        <div className="w-full p-4 overflow-y-scroll rounded-lg my-6 md:my-0 "
        style={{boxShadow:"0px 0px 4px #ccc"}}>
            {children}
        </div>
          </div>
      
    </>
  )
}

export default Dashboard