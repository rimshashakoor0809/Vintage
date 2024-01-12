import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { userResetPassword } from "../../redux/actions/user"
import { useNavigate, useParams } from "react-router-dom"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const {id} = useParams("id");
  const navigate = useNavigate();
   const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match")
      return;
     }
     
    dispatch(userResetPassword(id, password))
     toast.success("Password reset successfully");
     navigate("/login");
     
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="flex justify-center items-center w-full p-2 my-2">
            <h3 className="text-2xl font-bold text-left text-vintage-black">Sign up to continue to Vintage</h3>
          </div>
          <form className="space-y-4" onSubmit={submitHandler}>
            

    

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-vintage-black"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-gray-400 focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
                {showPassword ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-base font-medium text-vintage-black"
              >
               Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-gray-400 focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
                {showPassword ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>

          

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword