"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/scroll.css"; // Import the CSS file
import { useRouter } from "next/navigation";

export default function Autoscroll() {
    const { loading, products, error } = useSelector((state) => state.productSlice);
    const [allProducts, setAllProducts] = useState([]);
    const router = useRouter()
    useEffect(() => {
        if (products) {
            setAllProducts(products);
        }
    }, [products]);
    if (loading || error) {
        return <div>Loading...</div>;
    }
    const handleClicked = (id)=>{
        router.push(`/Product/${id}`)
    }
    
    const scrollProducts = allProducts ? allProducts.slice(-25) : [];

    return (
        <div className="scroll">
            <div className="marquee-container">
                <div className="marquee-content">
                    {scrollProducts?.map((product, index) => (
                        <div key={index} className="marquee-item" onClick={()=>handleClicked(product.id)}>
                            <div className="marqueebox">
                                <div className="mimg-container">
                                    <img src={product?.images[0]} alt={product?.title} />
                                </div>
                                <div className="mshoppingName">
                                    <div className="mshoppingProduct text-sm">{product?.title}</div>
                                    <div className="mshopingRate">${product?.price}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
