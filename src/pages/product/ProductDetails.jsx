import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";

import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();

    const [singleProductData, setSingleProductData] = useState([])
    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [activeTab, setActiveTab] = useState("description")

    const getSingleProductData = async () => {
        try {
            const formdata = new FormData();
            formdata.append("product_id", id);

            // setLoading(true);
            const res = await api.post(endPointApi.postSingleProduct, formdata);

            if (res?.data && res?.data?.data) {
                setSingleProductData(res?.data?.data || [])
                if (res?.data?.data?.images?.length > 0) {
                    setSelectedImage(res.data.data.images[0].image);
                }
            }
        } catch (err) {
            console.log("Error Fetch data", err)
        } finally {
            // setLoading(false)
        }
    }


    useEffect(() => {
        getSingleProductData()
    }, [])


    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const addToCart = () => {
        try {
            const formdata = new FormData();
            formdata.append("product_id", id);
            formdata.append("quantity", count);
            formdata.append("type", 1);

            api.post(endPointApi.postAddToCart, formdata).then((res) => {
                if (res.data.status == 200) {
                    toast.success(res?.data?.message)
                }
            })
            if (res.sta)

                console.log("res", res);
        } catch (err) {
            console.log("Error Fetch data", err)
        } finally {
            // setLoading(false)
        }
    }
    return (
        <div className="w-full px-2  sm:px-4 md:px-6 lg:px-8 pt-[60px] sm:pt-[80px] md:pt-[100px] flex flex-col items-center">
            <div className="w-full mt-4 max-w-[1300px]">
                {/* Breadcrumb */}
                <div className="text-sm sm:text-base text-gray-500 mb-4 flex flex-wrap gap-1">
                    Home <i className="ri-arrow-right-s-line"></i> {singleProductData?.category_name}{" "}
                    <i className="ri-arrow-right-s-line"></i> {singleProductData?.sub_category_name}{" "}
                    <i className="ri-arrow-right-s-line"></i> {singleProductData?.product_name}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT PART */}
                    <div className="flex gap-4">
                        {/* Thumbnails - Left side */}
                        <div className="flex mt-5 flex-col gap-2 justify-start">
                            {singleProductData?.images?.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image}
                                    alt="No Image"
                                    onClick={() => setSelectedImage(img.image)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 border rounded-md object-contain cursor-pointer 
                                     ${selectedImage === img.image
                                            ? "border-[#251c4b] border-2"
                                            : "border-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Main Image - Right side */}
                        <div className="overflow-hidden rounded-lg flex-1">
                            <img
                                src={
                                    selectedImage ||
                                    (singleProductData?.images?.length > 0
                                        ? singleProductData.images[0].image
                                        : "/src/Image/No image.jpg")
                                }
                                alt={singleProductData?.product_name || "Product"}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-0 px-2 sm:px-4 lg:px-0 max-w-2xl mx-auto space-y-8">
                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            {singleProductData?.product_name}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="ri-star-fill"></i>
                                ))}
                            </div>
                            <button className="border border-gray-300 text-black text-xs sm:text-sm px-2 py-0.5 rounded">
                                3.00
                            </button>
                            <p className="text-gray-500 text-xs sm:text-sm">2 Reviews</p>
                        </div>

                        {/* Description (short) */}
                        <p className="text-sm sm:text-base text-gray-600">
                            {singleProductData?.long_description}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-black text-3xl sm:text-4xl font-bold">
                                ₹{singleProductData?.price}
                            </span>
                            <span className="line-through text-red-500 text-base sm:text-lg font-medium">
                                ₹{singleProductData?.cancle_price}
                            </span>
                        </div>



                        {/* SKU Details Section (instead of hr line) */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Product Details</h3>
                            <ul className="space-y-1 text-sm sm:text-base text-gray-600">
                                <li>
                                    <span className="font-medium text-gray-800">SKU:</span>{" "}
                                    {singleProductData?.sku}
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Category:</span>{" "}
                                    {singleProductData?.category_name}
                                </li>
                                <li>
                                    <span className="font-medium text-gray-800">Sub Category:</span>{" "}
                                    {singleProductData?.sub_category_name}
                                </li>
                            </ul>
                        </div>

                        {/* Quantity + Buttons */}
                        <div className="flex items-center gap-6 flex-wrap">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 rounded-lg py-1 px-2">
                                <button
                                    onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                                    className="h-9 w-9 flex items-center justify-center text-xl font-bold cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="px-4 text-lg font-semibold">{count}</span>
                                <button
                                    onClick={() => setCount((prev) => prev + 1)}
                                    className="h-9 w-9 flex items-center justify-center text-xl font-bold cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            {/* Add to Cart Button */}
                            <button
                                className="bg-[#251C4B] hover:bg-[#1a1335] text-white px-8 py-2 font-bold rounded-lg flex items-center gap-3 text-lg cursor-pointer"
                                onClick={() => addToCart()}
                            >
                                <i className="ri-shopping-cart-fill text-2xl"></i> Add to Cart
                            </button>
                            <button
                                className="bg-[#25d366] text-white px-4 py-2  rounded-lg flex items-center gap-3 text-lg cursor-pointer"
                            // onClick={() => addToCart()}
                            >
                                <i className="ri-whatsapp-fill text-2xl"></i>
                            </button>
                        </div>


                        {/* Wishlist, Share */}
                        <div className="flex gap-6 text-sm sm:text-base text-black flex-wrap">
                            <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-heart-line"></i>
                                Add to wishlist
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-share-2-line"></i>
                                Share this Product
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-12">
                    {/* Tab Buttons */}
                    <div className="flex gap-6 text-sm sm:text-base font-medium border-b border-gray-200 flex-wrap">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-2 ${activeTab === "description"
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab("additional")}
                            className={`pb-2 ${activeTab === "additional"
                                ? "border-b-2 border-black text-black"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Additional Information
                        </button>
                        <button className="pb-2 text-gray-500 hover:text-black">Reviews (2)</button>
                    </div>



                    <div className="mt-6">
                        {activeTab === "description" && (
                            <>
                                <div className="space-y-4 text-black text-sm sm:text-base leading-relaxed">
                                    <p>{singleProductData?.description}</p>
                                </div>
                            </>
                        )}
                        {activeTab === "additional" && (
                             <></>
                        )}
                    </div>
                </div>

                <div className="mt-16 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Products</h2>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {singleProductData?.related_products?.length > 0 ? (
                            singleProductData.related_products.map((item, index) => (
                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative"
                                >

                                    <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3 perspective-1000">
                                        <div className="w-full h-full relative group preserve-3d">
                                            {/* Front Image */}
                                            <div className="absolute inset-0 backface-hidden transition-transform duration-700 transform group-hover:rotate-y-180">
                                                <img
                                                    src={
                                                        item.product_image && item.product_image !== ""
                                                            ? item.product_image
                                                            : "/src/Image/No image.jpg"
                                                    }
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            {/* Back Image (same as front) */}
                                            <div className="absolute inset-0 backface-hidden transform rotate-y-180 transition-transform duration-700 group-hover:rotate-y-360">
                                                <img
                                                    src={
                                                        item.product_image && item.product_image !== ""
                                                            ? item.product_image
                                                            : "/src/Image/No image.jpg"
                                                    }
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                        </div>
                                    </div>



                                    {/* Product Info */}
                                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 h-10">
                                        {item.product_name}
                                    </h4>
                                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                                        {item.description}
                                    </p>

                                    {/* Price Section */}
                                    <div className="flex items-center gap-5 mt-3">
                                        <span className="text-lg font-bold text-black">₹{item.price}</span>
                                        {item.cancle_price && (
                                            <span className="text-sm text-red-500 line-through">
                                                ₹{item.cancle_price}
                                            </span>
                                        )}
                                    </div>

                                    {/* Button (Hidden until hover) */}
                                    <button className="opacity-0 group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg hover:bg-[#251c4b] transition text-md  font-bold">
                                        Read More
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No related products available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
