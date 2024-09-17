"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../styles/homeview.css';
import { useRouter } from "next/navigation";
import Header from "./header";

export default function Homeview() {
    const { loading, products, error } = useSelector((state) => state.productSlice);
    const [allProducts, setAllProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (products) {
            setAllProducts(products);
        }
    }, [products]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const lastFiveProducts = allProducts.slice(-5);

    return (
        <div>
            <Header />
            <div className="home-view-container">
                <div className="col1">
                    {allProducts[30] && (
                        <div className="box1 box" onClick={() => router.push(`/Product/${allProducts[30].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[30]?.images[0]} alt={allProducts[30]?.title} style={{ scale: '1.3' }} />
                            </div>
                            <div className="shoppingName">
                                <div className="shoppingProduct text-sm">{allProducts[30]?.title}</div>
                                <div className="shoppingRate">${allProducts[30]?.price}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col2">
                    {allProducts[31] && (
                        <div className="box2 box" onClick={() => router.push(`/Product/${allProducts[31].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[31]?.images[0]} alt={allProducts[31]?.title} />
                            </div>
                            <div className="shoppingName">
                                <div className="shoppingProduct">{allProducts[31]?.title}</div>
                                <div className="shoppingRate">${allProducts[31]?.price}</div>
                            </div>
                        </div>
                    )}
                    {allProducts[32] && (
                        <div className="box3 box" onClick={() => router.push(`/Product/${allProducts[32].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[32]?.images[0]} alt={allProducts[32]?.title} />
                            </div>
                            <div className="shoppingName">
                                <div className="shoppingProduct">{allProducts[32]?.title}</div>
                                <div className="shoppingRate">${allProducts[32]?.price}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
