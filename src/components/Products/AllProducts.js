import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/lib/productSlice';
import './allproduct.css';

export default function AllProducts() {
  const { loading, products, error } = useSelector(state => state.productSlice);
  const dispatch = useDispatch();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);
console.log(products);

  useEffect(() => { 
    const handleUserInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    return () => document.removeEventListener('click', handleUserInteraction);
  }, []);

  const handleMouseOver = async () => {
    if (!hasInteracted) return; 

    const audio = new Audio('/audios/choose.mp3');
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0; 
    }
    try {
      await audio.play();
     
    } catch (error) {
      console.error('Audio play failed:', error);
    }
  };

  const productItems = products || [];

  return (
    <div className="allProduct-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading products</p>}
      <div className="product-grid">
        {productItems.map((product) => (
          <div key={product.id} className="product-box" onMouseEnter={handleMouseOver}>
            <img src={product.images[0]} className="product-view-img" alt={product.title} />
            <div className="pur-btn">
              <div className="productName">{`${product.title.length>15?product.title.slice(0,15)+"...":product.title}`}</div>
              <div className="Amount">${product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
