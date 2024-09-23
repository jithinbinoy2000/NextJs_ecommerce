import { useSession } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { productSearch } from "../lib/productSlice";
import '../styles/mainheader.css'
import { useRouter } from "next/navigation";

export default function Mainheader (){
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      dispatch(productSearch(query));
    };
    const {cart} = useSelector((state)=>state.cartSlice)
    
    const hnadleCartNav =()=>{
      router.push('/Cart')
    }
    return(
        <div className="w-full h-[auto] flex justify-between p-3">
      <div className="left flex  items-center justify-center hover:cursor-pointer" onClick={()=>{router.push("/")}}>
        <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
        <div>Ecom</div>
       
      </div>
      <div>
      <input
        type="text"
        placeholder="Search Products..."
        className="bg-transparent  min-w-[1/2] h-[2rem] p-2 border-2 border-[#979797] rounded-md focus:border border-5 sm:max-w-[20rem] md:min-w-[20rem]"
        onChange={handleSearch}
      />
      </div>
      

      <div className="right flex items-center gap-4">
        {session ? (
          <div className="flex   items-center gap-3">
          <div className="flex flex-col relative border-transparent  p-2" onClick={()=>hnadleCartNav()}>
           <div className="text-sm font-light absolute z-0 bottom-7 left-6 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500">{cart.length}</div>
           <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center hover:cursor-pointer">
           <Image src={'/images/carts.png'} width={20} height={100} alt="Cart" className="z-1"/>
          </div>
            
           </div>
           
            <Image
              src={session.user.image || "/images/profile-user.png"}
              width={30}
              height={40}
              alt="User Avatar"
              className="rounded-full"
            />
             <p className="name text-white font-bold text-[0.8rem]">{session.user.name.toLocaleUpperCase()}</p>
          </div>
        ) : (
          <>
          
           <UserSignIn/>
          </>
        )}
      </div>
    </div>
    )
}