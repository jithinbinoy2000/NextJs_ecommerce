"use client"
// app/component/header.js
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { cart } = useSelector((state) => state.cartSlice);
  const wishlist = useSelector((state) => state.wishlist);
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [email, setEmail] = useState(session ? session.user.email : "");

  const handleCartNav = () => {
    router.push('/Cart');
  };

  const handleNavWishlist = () => {
    router.push('/Wishlist');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
    setShowProfileMenu(false); // Close the menu after signing out
  };

  return (
    <div className="w-full h-[auto] flex justify-between items-center p-3">
      <div className="left flex gap-2 items-center hover:cursor-pointer">
        <div className="flex justify-center items-center gap-1" onClick={() => { router.push("/") }}>
          <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
          <div>Ecom</div>
        </div>

        <div className="ms-6 h-full text-sm font-light underline cursor-pointer" onClick={() => { router.push("/Dashboard") }}>
          <p>All</p>
        </div>
      </div>

      <div className="right flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-3 relative">
            <div className="flex flex-col relative border-transparent p-2" onClick={handleNavWishlist}>
              <div className="text-sm font-light absolute z-0 bottom-7 left-6 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500">{wishlist.wishlist.length}</div>
              <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center hover:cursor-pointer">
                <Image src={'/images/heart.png'} width={20} height={100} alt="Wishlist" className="z-1" />
              </div>
            </div>
            <div className="flex flex-col relative border-transparent p-2" onClick={handleCartNav}>
              <div className="text-sm font-light absolute z-0 bottom-6 left-7 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500">{cart.length}</div>
              <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center hover:cursor-pointer">
                <Image src={'/images/carts.png'} width={20} height={100} alt="Cart" className="z-1" />
              </div>
            </div>
            <div className="relative">
              <Image
                src={session.user.image || "/images/profile-user.png"}
                width={32}
                height={40}
                alt="User Avatar"
                className="rounded-full cursor-pointer border-[0.1rem] border-green-500"
                onClick={toggleProfileMenu}
              />
              {showProfileMenu && (
                <div className="absolute right-2 top-10 bg-[#3a3a3a] shadow-md rounded-lg p-2 z-10 min-w-[10rem] flex flex-col gap-2">
                  <div className=" text-white py-1 px-2 rounded w-full hover:bg-[#202020]">{session.user.name.toLocaleUpperCase()}</div>
                  <div className=" text-white py-1 px-2 rounded w-full hover:bg-[#202020]">{session.user.email}</div>
                  <hr/>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white py-1 px-2 rounded w-full flex justify-center gap-2 hover:bg-red-600"
                  >
                    <Image src={'/images/log-out.png'} width={20} height={100} alt="logout"/>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          <UserSignIn />
        )}
      </div>
    </div>
  );
}
