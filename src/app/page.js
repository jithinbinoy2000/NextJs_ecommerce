"use client"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./lib/productSlice";
import Homeview from "../components/Homeview";
import Autoscroll from "../components/Autoscroll";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);
  return (
   <div className="main-page kanit-semibold p-2 ">
 <Homeview/>
 <Autoscroll/>
   </div>
  );
}
