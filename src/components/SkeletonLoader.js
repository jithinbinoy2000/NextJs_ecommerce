// components/SkeletonLoader.js
import React from 'react';
import "../styles/SkeletonLoader.css"

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-box">
        <div className="skeleton-img"></div>
        <div className="skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
      <div className="skeleton-box">
        <div className="skeleton-img"></div>
        <div className="skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
      <div className="skeleton-box">
        <div className="skeleton-img"></div>
        <div className="skeleton-text">
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
