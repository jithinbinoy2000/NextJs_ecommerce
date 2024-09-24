"use client"
import { useSession, signOut } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { productSearch } from "../lib/productSlice";
import '../styles/mainheader.css';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Mainheader () {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const { cart } = useSelector((state) => state.cartSlice);
    const wishlist = useSelector((state) => state.wishlist);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      dispatch(productSearch(query));
    };

    const handleCartNav = () => {
      router.push('/Cart');
    };

    const toggleProfileMenu = () => {
      setShowProfileMenu((prev) => !prev);
    };

    const handleSignOut = () => {
      signOut();
      setShowProfileMenu(false); // Close the menu after signing out
    };

    return (
        <div className="w-full h-[auto] flex justify-between p-3">
          <div className="left flex items-center justify-center hover:cursor-pointer" onClick={() => { router.push("/") }}>
            <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
            <div>Ecom</div>
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Search Products..."
              className="bg-transparent min-w-[1/2] h-[2rem] p-2 border-2 border-[#979797] rounded-md focus:border-5 sm:max-w-[20rem] md:min-w-[20rem]"
              onChange={handleSearch}
            />
          </div>

          <div className="right flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 relative">
                <div className="flex flex-col relative border-transparent p-2" onClick={handleCartNav}>
                  <div className="text-sm font-light absolute z-0 bottom-7 left-6 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500">{wishlist.wishlist.length}</div>
                  <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center hover:cursor-pointer">
                    <Image src={'/images/heart.png'} width={20} height={100} alt="Wishlist" className="z-1" />
                  </div>
                </div>

                <div className="flex flex-col relative border-transparent p-2" onClick={handleCartNav}>
                  <div className="text-sm font-light absolute z-0 bottom-7 left-6 w-3 h-3 rounded-full flex justify-center items-center p-2 bg-red-500">{cart.length}</div>
                  <div className="w-7 h-7 rounded-full bg-white flex justify-center items-center hover:cursor-pointer">
                    <Image src={'/images/trolley.png'} width={20} height={100} alt="Cart" className="z-1" />
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
                      <div className="text-white py-1 px-2 rounded w-full hover:bg-[#202020]">{session.user.name.toLocaleUpperCase()}</div>
                      <div className="text-white py-1 px-2 rounded w-full hover:bg-[#202020]">{session.user.email}</div>
                      <hr/>
                      <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white py-1 px-2 rounded w-full flex justify-center gap-2 hover:bg-red-600"
                      >
                        <Image src={'/images/log-out.png'} width={20} height={100} alt="logout" />
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
