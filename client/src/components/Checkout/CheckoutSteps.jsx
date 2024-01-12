
const CheckoutSteps = ({ active }) => {

    console.log("check active:", 1)
    return (
        <div className='w-full flex justify-center'>
            <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
                <div className="flex items-center">
                    <div className="px-[20px] h-[38px] rounded-[20px] bg-vintage-primary flex items-center justify-center cursor-pointer">
                        <span className="text-[#fff] text-[16px] font-[600]">Shipping</span>
                    </div>
                    <div className={`${active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] bg-vintage-light"
                            : "w-[30px] 800px:w-[70px] h-[4px] bg-vintage-dark"
                        }`} />
                </div>

                <div className="flex items-center">
                    <div className={`${active > 1 ? `px-[20px] h-[38px] rounded-[20px] bg-vintage-primary flex items-center justify-center cursor-pointer` : `px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer bg-vintage-light`}`}>
                        <span className={`text-[#fff] text-[16px] font-[600]`}>
                            Payment
                        </span>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className={`${active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] bg-vintage-primary"
                            : "w-[30px] 800px:w-[70px] h-[4px] bg-vintage-dark"
                        }`} />
                    <div className={`${active > 2 ? `px-[20px] h-[38px] rounded-[20px] bg-vintage-primary flex items-center justify-center cursor-pointer` : `px-[20px] h-[38px] rounded-[20px] flex items-center justify-center cursor-pointer bg-vintage-light`}`}>
                        <span className={`text-[#fff] text-[16px] font-[600]`}>
                            Success
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSteps