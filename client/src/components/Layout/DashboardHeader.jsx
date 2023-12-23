import { Link } from "react-router-dom"

const DashboardHeader = () => {
  return (
    <div className="w-full mx-auto">
      <div className="w-full hidden 800px:flex items-center justify-between px-8 py-2 bg-vintage-dark">
        <div>
          {/* Logo */}
            <Link to="/">
            <div className="border-2 border-vintage-primary p-1.5 rounded-lg">
              <h1 className="text-vintage-primary font-extrabold">VINTAGE</h1>
              </div>
            </Link>
        </div>
      
      </div>
      

        
    </div>
  )
}

export default DashboardHeader