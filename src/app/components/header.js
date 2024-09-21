"use client"
// app/component/header.js
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession(); // Get session data (user logged in or not)
  const {cart} = useSelector((state)=>state.cartSlice)
  const router = useRouter();
  const hnadleCartNav =()=>{
    router.push('/Cart')
  }

  return (
    <div className="w-full h-[auto] flex justify-between items-center p-3">
      <div className="left flex gap-2 items-center hover:cursor-pointer">
        <div className="flex justify-center items-center gap-1 " onClick={()=>{router.push("/")}}>
        <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
        <div>Ecom</div>
        </div>
        
        <div className="ms-6 h-full text-sm font-light underline  cursor-pointer" onClick={()=>{router.push("/Dashboard")}}><p>All</p></div>
      </div>
      

      <div className="right flex items-center gap-4">
        {session ? (
          <div className="flex   items-center gap-3">

           <div className="flex flex-col relative border-transparent  p-2" onClick={()=>hnadleCartNav()}>
           <div className="text-sm font-light absolute z-0 bottom-6 left-7 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500 ">{cart.length}</div>
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
             <p className="text-white font-bold text-[0.8rem]">{session.user.name.toLocaleUpperCase()}</p>
          </div>
        ) : (
          <>
          \
            <UserSignIn />
          </>
        )}
      </div>
    </div>
  );
}

