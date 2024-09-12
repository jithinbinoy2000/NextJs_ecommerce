"use client";

import AllProducts from "@/components/Products/AllProducts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../lib/productSlice";
import "./dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  

  return (
    <div className="dashboard-container">
      <div className="collection-section">
        <h2 className="text-[#9b9b9b] text-m">Collections</h2>
        <ul className="text-white font-bold text-lg text-justify">
          <li className="list">All</li>
          <li className="list">Cosmetics</li>
          <li className="list">Beauty</li>
          <li className="list">Groceries</li>
          <li className="list">Dress</li>
        
        </ul>
      </div>
      <div className="product-view">
        <AllProducts />
      </div>
      <div className="sort-section">
      <h2 className="text-[#9b9b9b] text-m">Sort</h2>
        <ul className="text-white font-bold text-lg text-justify">
         <li className="list">From Low Price</li>
         <li className="list">From High Price</li>
         <li className="list">From High Rating</li>
        </ul>
      </div>
    </div>
  );
}
