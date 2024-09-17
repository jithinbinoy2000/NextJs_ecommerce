import { useSession } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { productSearch } from "../lib/productSlice";
import '../styles/mainheader.css'
export default function Mainheader (){
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
      const query = e.target.value.toLowerCase();
      dispatch(productSearch(query));
    };
    return(
        <div className="w-full h-[auto] flex justify-around p-3">
      <div className="left flex gap-2 items-center">
        <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
        <div>Ecom</div>
       
      </div>
      <div>
      <input
        type="text"
        placeholder="Search Products..."
        className="bg-transparent  min-w-[10rem] w-[20rem] h-[2rem] p-2 border-2 border-[#262626] rounded-md focus:border border-5"
        onChange={handleSearch}
      />
      </div>
      

      <div className="right flex items-center gap-4">
        {session ? (
          <div className="flex   items-center gap-3">

           
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
          \
           <UserSignIn/>
          </>
        )}
      </div>
    </div>
    )
}