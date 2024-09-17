//app/component/UserSignIn.js
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function UserSignIn() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn("google", { callbackUrl: "/Dashboard" });
    } catch (error) {
      console.error("Sign-in failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
      >
        <Image src='/images/user.png' width={40} height={40} alt="User Icon" />
        <p className="text-white text-xl font-bold">Sign In</p>
      </button>
    </form>
  );
}
