"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productCategory, productSort } from "../lib/productSlice";
import "./dashboard.css";

import AllProducts from "../components/Products/AllProducts";
import Mainheader from "../components/mainheader";

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productSlice.products);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('Default');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategory = (e) => {
    const value = e.target.dataset.value;
    setCategory(value);
    setSort("Default");
    setCurrentPage(1);
    dispatch(productCategory(value));
  };

  const handleSort = (e) => {
    const value = e.target.dataset.value;
    setSort(value);
    dispatch(productSort(value));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, category, sort]);

  return (
    <>
      <Mainheader />
      <div className="dashboard-container">
        <div className="collection-section">
          <h2 className="text-[#9b9b9b] text-m">Collections</h2>
          <ul className="text-white font-lighter text-sm text-justify">
            {['all', 'Cosmetics', 'Beauty', 'Groceries', 'Dress'].map((cat) => (
              <li
                key={cat}
                className={`list ${category === cat ? 'active' : ''}`}
                data-value={cat}
                onClick={handleCategory}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <div className="product-view">
          <AllProducts 
            products={products}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="sort-section">
          <h2 className="text-[#9b9b9b] text-m">Sort</h2>
          <ul className="text-white font-lighter text-sm text-justify">
            {['Default', 'Low Price', 'High Price', 'High Rating'].map((sortOption) => (
              <li
                key={sortOption}
                className={`list ${sort === sortOption ? 'active' : ''}`}
                data-value={sortOption}
                onClick={handleSort}
              >
                {sortOption}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
