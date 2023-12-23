import axios from 'axios';
import  { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/user/login`,
        { email, password });
      console.log("Response:", response);
      const { data } = response;
      if (!(data && data.success)) {
        toast.error("Failed to login the user");
        return;
      }
      // toast.success(`${data?.message}`)
      navigate("/profile")
    } catch (error) {
      console.log("Error in Login:", error.response.data);
      toast.error(`${error.response.data.message}`)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="flex justify-center items-center w-full p-2 my-2">
            <h3 className="text-2xl font-bold text-left text-vintage-black">Sign in to continue to Vintage</h3>
          </div>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-vintage-black"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-vintage-black"
              >
                Password
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
            <div className={`flex justify-end`}>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-semibold text-vintage-light hover:text-vintage-light"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
              >
                Login
              </button>
            </div>
            <div className={`flex flex-row w-full items-center`}>
              <h4 className='text-sm'>Not have any account?</h4>
              <Link to="/register" className="text-vintage-light pl-2">
                register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login