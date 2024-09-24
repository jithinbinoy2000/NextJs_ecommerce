"use client";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { removeFromWishlist } from "../lib/wishlistSlice";


export default function Wishlist() {
  const [wishItems, setWishItems] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    router.back();
  };

  const { products } = useSelector((state) => state.productSlice);
  const wishlist = useSelector((state) => state.wishlist.wishlist); 

  useEffect(() => {
    if (wishlist.length > 0 && products.length > 0) {
        const filteredItems = products.filter((product) =>
            wishlist.some((wishItem) => wishItem.id === product.id)
        );
        setWishItems(filteredItems);
    } else {
        setWishItems([]);
    }
}, [wishlist, products]);

  const handleRemoveFromWishlist = (id) => {
    console.log("deleter");
    
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="flex justify-around p-2 w-full">
        <div className="w-full text-center text-lg font-semibold underline">
          My Wishlist
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer me-2 hover:text-red-500"
        >
          X
        </div>
      </div>
      <div className="wishlist-container">
        {wishItems.length > 0 ? (
          wishItems.map((item) => (
            <div
              key={item.id}
              className="wishlist-item mb-2 rounded-xl bg-black px-5 p-5 flex gap-10 justify-between items-center flex-wrap"
            >
              <div className="bg-[#ffffffd8] rounded-md hover:border-2 border-blue-600">
                <img
                  src={item.images[0]}
                  width={150}
                  height={100}
                  alt="product"
                  className="p-3 border border-white rounded-md"
                />
              </div>
              <div>
                <div className="text-wrap">{item.title}</div>
                <div>
                  ${" "}
                  {item.price} {/* Display item price */}
                </div>
              </div>
              <div
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                Remove
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center">
            <Image
              src="/images/lover.png"
              width={50}
              height={100}
              alt="Wishlist Empty"
            />
            <div className="text-wrap text-lg font-semibold">
              Your wishlist is empty
            </div>
            <div
              className="p-2 border border-white rounded hover:bg-black cursor-pointer"
              onClick={() => router.back()}
            >
              Explore Collections
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
