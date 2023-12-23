import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { HiClipboardDocumentCheck } from "react-icons/hi2";


const OrderSuccessPage = () => {
   return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
}

const Success = () => {
  return (
    <div className="flex flex-col justify-center items-center m-10 gap-5">
      <div className="p-8 bg-gray-300  rounded-full border-4 border-green-500">
      <HiClipboardDocumentCheck size={100} className="text-green-500"/>
        </div>
      <h5 className="text-center mb-14 text-[18px] text-[#000000a1]">
        Your order has been placed successfully.
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage