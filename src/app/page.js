"use client"
import Autoscroll from "../components/autoscroll";
import Homeview from "../components/Homeview"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./lib/productSlice";

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
