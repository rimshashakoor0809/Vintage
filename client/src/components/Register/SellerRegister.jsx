import  { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
const SellerRegister = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState(0)
  const [code, setCode] = useState(0)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    // const reader = new FileReader();

    // console.log("File Reader:",reader)
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAvatar(reader.result);
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  const resetHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    // TODO: validate email
    if (password !== confirmPassword) {
      toast.error("Password does not match")
      return;
    }
    const form = new FormData();
    form.append("name", name)
    form.append("email", email)
    form.append("password", password)
    form.append("file", avatar)
    form.append("phoneNumber", phoneNo)
    form.append("address", address)
    form.append("zipCode", code)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/seller/register`, form,
        { headers: { "Content-Type": "multipart/form-data" } });
      console.log("Response:", response);
      const { data } = response;
      if (!(data && data.success)) {
        toast.error("Failed to register the user");
        return;
      }
      toast.success(`${data?.message}`)
      resetHandler();
    } catch (error) {
      console.log("Error in Registration:", error.response.data);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10">
          <div className="flex justify-center items-center w-full p-2 my-2">
            <h3 className="text-2xl font-bold text-left text-vintage-black">Sign up to continue to Vintage</h3>
          </div>
          <form className="space-y-4" onSubmit={submitHandler}>
            {/* Shop Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-vintage-black"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-base font-medium text-vintage-black"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>

{/* Shop Name */}
            <div>
              <label
                htmlFor="address"
                className="block text-base font-medium text-vintage-black"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <label
                htmlFor="code"
                className="block text-base font-medium text-vintage-black"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="code"
                  autoComplete="code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-vintage-black rounded-md focus:shadow focus:shadow-orange-200 placeholder-vintage-neutral focus:outline-none focus:ring-vintage-primary focus:border-vintage-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
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

            {/* Avatar */}

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8 text-vintage-primary" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-md text-vintage-white bg-vintage-dark hover:bg-vintage-primary"
              >
                Register
              </button>
            </div>
            <div className={`flex flex-row w-full items-center`}>
              <h4 className='text-sm'>already have an account?</h4>
              <Link to="/login" className="text-vintage-light pl-2">
                login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister