"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../styles/homeview.css'
import { useRouter } from "next/navigation";
import Header from "./header";
import Image from "next/image";

export default function Homeview() {
    const { loading, products, error } = useSelector((state) => state.productSlice);
    const [allProducts, setAllProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (products) {
            setAllProducts(products);
        }
    }, [products]);

    if (loading) return <div className="w-full h-[50vw] flex justify-center items-center">
        <Image src={"/images/loading.png"} width={40} height={100} alt="Loading..." className="loading"/>
    </div>;
    if (error) return <div>Error: {error}</div>;

    const lastFiveProducts = allProducts.slice(-5);

    return (
        <div>
            <Header />
            <div className="home-view-container">
                <div className="col1">
                    {allProducts[1] && (
                        <div className="box1 box" onClick={() => router.push(`/Product/${allProducts[1].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[1]?.images[0]} alt={allProducts[1]?.title} style={{ scale: '1.3' }} />
                            </div>
                            <div className="pur-container">
                                <div className="pur-titile text-sm">{allProducts[1]?.title}</div>
                                <div className="pur-rate">${allProducts[1]?.price}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col2">
                    {allProducts[2] && (
                        <div className="box2 box" onClick={() => router.push(`/Product/${allProducts[2].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[2]?.images[0]} alt={allProducts[2]?.title} />
                            </div>
                            <div className="pur-container">
                                <div className="pur-titile">{allProducts[2]?.title}</div>
                                <div className="pur-rate">${allProducts[2]?.price}</div>
                            </div>
                        </div>
                    )}
                    {allProducts[3] && (
                        <div className="box3 box" onClick={() => router.push(`/Product/${allProducts[3].id}`)}>
                            <div className="img-container">
                                <img src={allProducts[3]?.images[0]} alt={allProducts[3]?.title} />
                            </div>
                            <div className="pur-container">
                                <div className="pur-titile">{allProducts[3]?.title}</div>
                                <div className="pur-rate">${allProducts[3]?.price}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
