
import Image from "next/image";
import Link from "next/link";

export default function SuccessPayment(){
    
    return(
        <div className="w-full h-[100vh] flex justify-center items-center">
        
      <div className="flex flex-col justify-center items-center">
      <Image src={'/images/success.png'} width={70} height={100} alt="Successfull" className="successPayment "/>
      <p className=" mt-5 text-lg text-[#3eb655]">Transaction Successful...</p>
      <p> Your Order has been  placed Successfully</p>
      <Link href={"/Dashboard"}>
      <button className=" p-2 bg-[#3eb655] rounded-md mt-2 text-lg font-semibold hover:bg-[#1e662c]">Continue Shopping</button>
      </Link>
      </div>
      </div>
    )
}