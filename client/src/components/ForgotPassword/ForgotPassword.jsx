import { useState } from "react";
import { useDispatch } from "react-redux";
import { userForgotPassword } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(userForgotPassword(email))
    toast.success("Reset link sent to your email successfully");
      
  }
   return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="flex justify-center items-center w-full p-2 my-2">
            <h3 className="text-2xl font-bold text-left text-vintage-black">Forgot Password?</h3>
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
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword