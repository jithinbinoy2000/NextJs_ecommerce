import { useSession } from "next-auth/react";
import UserSignIn from "./UserSignIn";
import Image from "next/image";

export default function Mainheader (){
    const { data: session } = useSession();
    return(
        <div className="w-full h-[auto] flex justify-between p-3">
      <div className="left flex gap-2 items-center">
        <Image src='/images/shopping-bag.png' height={100} width={25} alt="Logo" />
        <div>Ecom</div>
       
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
             <p className="text-white font-bold text-[0.8rem]">{session.user.name.toLocaleUpperCase()}</p>
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