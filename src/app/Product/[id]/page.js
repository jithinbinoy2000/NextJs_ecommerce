"use client"
import { useEffect } from 'react'
import './product.css'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProducts, findSelectedProduct } from '../../lib/productSlice'
import Autoscroll from '../../components/Autoscroll'
import Header from '../../components/header'

import { addToCart, removeFromCart } from '../../lib/cartSlice'
import Image from 'next/image'
import  { addToWishlist, removeFromWishlist } from '../../lib/wishlistSlice'
import { useSession } from 'next-auth/react'

export default function Product({ params }) {
    const { data: session } = useSession();
    const dispatch = useDispatch()
    const { loading, products, error, selectedProduct } = useSelector((state) => state.productSlice);
    const { cart } = useSelector((state) => state.cartSlice);
    const wishlist = useSelector((state) => state.wishlist);
    


    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    useEffect(() => {
        if (!loading && !error && products.length > 0 && params.id) {
            dispatch(findSelectedProduct(Number(params.id)))
        }
    }, [loading, error, products, params.id, dispatch])

    // console.log('Selected Product:', selectedProduct);
    const handleAddCart  = (id) => {
        // console.log(id);
        dispatch(addToCart(id))
        alert("Cart Updated")
        
    }
    const handleRemoveCart= (id)=>{
       
        dispatch(removeFromCart(id))
        alert('Item Rmoved From Cart')
    }
    const handleAddWishlist = (id)=>{
        console.log("add");
        
        dispatch(addToWishlist(id))
    }
    const handleRemoveWishlist = (id)=>{
        console.log("dele");
        
        dispatch(removeFromWishlist(id))
    }
const isInCart = cart.find(item=>item.id === selectedProduct.id)
const isInWishList = wishlist.wishlist.find(item => item.id === selectedProduct?.id); 


    return (
        <div className="product">
          <Header/>
        <div className='product-container mt-5'>
            <div className='view'>
                <div className='img-container'>
                    {selectedProduct?.images?.length > 0 ? (
                       <div className="relative">
                       <img src={selectedProduct.images[0]} alt={selectedProduct.title} className="w-full h-auto relative z-0"
                        />
                       <button className="w-10 h-10 flex justify-center items-center rounded-full p-2 bg-[#f3f3f3f6] bg-opacity-30 backdrop-blur-md hover:bg-opacity-75 cursor-pointer absolute bottom-[0.1rem] right-[0.1rem] z-1
                       "  onClick={() => {
                        if (session?.user) {
                          !isInWishList
                            ? handleAddWishlist(selectedProduct.id)
                            : handleRemoveWishlist(selectedProduct.id);
                        } else {
                          alert('Please login to manage your wishlist');
                        }
                      }}>
                       <Image 
                                        src={isInWishList ? '/images/remove.png' : '/images/heart.png'} 
                                        width={20} 
                                        height={20} 
                                        alt='Wishlist' 
                                        className='add_wishlist' 
                                    />
                       </button>
                     </div>
                     
                      
                    ) : <div className='flex  justify-center align-center' > 
                        <Image src={"/images/loading.png"}  width={40} height={100} alt="Loading..." className="loading" />
                    </div> }
                </div>
            </div>
            <div className='details'>
                {selectedProduct ? (
                    <div>
                        <h1 className='text-3xl font-medium text-white'>{selectedProduct.title}</h1>
                        <div className='flex items-center  justify-between'>
                        <div className='w-1/5 min-w-40  border-transparent rounded-xl bg-[#2563ea] text-center py-2 text-l font-bold mt-3 mb-2'>
                            ${selectedProduct.price} USD
                        </div>
                       
                        <p className='text-lg mt-2'>{selectedProduct.stock} units left</p>
                            </div>
                       
                        <hr className='border-[#404040]'/>
                        <div className='text-medium font-bold mt-2'>Dimensions</div>
                        <div className='flex gap-5 mt-1 '>
                            <div>W: {selectedProduct.dimensions?.width} cm</div>
                            <div>H: {selectedProduct.dimensions?.height} cm</div>
                            <div>D: {selectedProduct.dimensions?.depth} cm</div>
                        </div>
                      
                        <div className='text-medium  font-semibold mt-2 '>Description</div>
                        <p className='text-medium  mt-2 max-w-[35rem]'>{selectedProduct.description}</p>
                        <div className='sub-details'>   
                        <div className='mt-2'>
                        <div className='text-l font-semibold mt-2'>Category</div>
                        <p className='text-medium mt-1'>{selectedProduct.category}</p>
                        </div>
                        <div className='mt-2'>
                        <div className='text-l font-semibold mt-2'>Brand</div>
                        <p className='text-medium  mt-2'>{selectedProduct.brand}</p>
                        </div>
                        <div className='mt-2'>
                        <div className='text-l font-semibold mt-2'>Warranty</div>
                        <p className='text-medium mt-2'>{selectedProduct.warrantyInformation}</p>
                        </div>
                        <div className='mt-2'>
                        <div className='text-l font-semibold mt-2'>Shipping</div>
                        <p className='text-medium  mt-2'>{selectedProduct.shippingInformation}</p>
                        </div>
                       
                        </div>
                        
                        
                            {/* <div>+</div> */}
                            <div className='p-2' onClick={() => {
                                    if (session?.user) {
                                        if (!isInCart) {
                                        handleAddCart(selectedProduct.id);
                                        } else {
                                        handleRemoveCart(selectedProduct.id);
                                        }
                                    } else {
                                        alert('Please login to add to cart');
                                    }
                                    }}>
                            <div className=' flex items-center bg-[#2563ea] max-w-40  justify-center text-l gap-2  rounded-xl py-2 mt-2 font-bold hover:bg-[#2375f0] cursor-pointer'>
                               {isInCart?"Remove From Cart":"Add To Cart"}
                                </div>
                        </div>
                    </div>
                ) : loading ? ( 
                    <div className='flex  justify-center items-center'>
 <Image src={"/images/loading.png"} width={10} height={100} alt="Loading..." className="loading"/>
                    </div>
                   
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    'No details available'
                )}
            </div>
        </div>
        <div className='mt-3 text-right w-[80vw] text-2xl font-bold'>Recommended Products</div>
        <Autoscroll/>
        </div>
    )
}
