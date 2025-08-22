import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router";
import Header from "../../component/Header";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
// import 'flowbite';

const Home = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const images = Array(20).fill(
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png"
    );

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await api.post(endPointApi.postHome, {});
            if (res.data && res.data.data) {
                setProduct(res.data.data || [])
            }
        } catch (err) {
            console.log("Error Fetch data", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <Header />

            <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px]">
                {/* Main Container with fixed width */}
                <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">

                    {/* Top Banner */}
                    <div className="w-full">
                        {product?.slider?.map((slide) => (
                            <img
                                key={slide.slider_id}
                                src={slide.image}
                                alt="Slider"
                                className="w-full h-auto rounded-2xl object-contain"
                            />
                        ))}
                    </div>

                    {/* Three Category Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                        {product?.banner?.map((slide) => (
                            <img
                                key={slide.banner_id}
                                src={slide.image}
                                className="w-full rounded-2xl object-cover"
                                alt="Banner"
                            />
                        ))}
                    </div>

                    {/* Category Card Section */}
                    <div className="w-full py-16 flex justify-center">
                        <div className="flex flex-wrap justify-center gap-10 cursor-pointer">
                            {product?.categories?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center hover:scale-105 transition-transform"
                                    onClick={() => navigate(`/product/${item.categories_id}`)}
                                >                                    
                                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.categories_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h5 className="mt-3 text-center text-[13px] font-bold text-black">
                                        {item.categories_name}
                                    </h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Paan Corner Grid */}
                    {/* <div className="w-full grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4 bg-white rounded-2xl mt-6 p-4">
                        {images.map((src, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={src}
                                    alt={`Paan Corner ${index + 1}`}
                                    className="w-[150px] rounded-2xl object-cover"
                                />
                            </div>
                        ))}
                    </div> */}

                    {/* Product Section */}
                    <div className="w-full py-16">
                        {product?.categories_products?.map((item, catIndex) => (
                            <div
                                key={catIndex}
                                className="w-full mb-12 bg-white rounded-2xl shadow-md p-6"
                            >
                                {/* Category Header */}
                                <div className="w-full flex justify-between items-center mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                        {item.categories_name}
                                    </h2>
                                    <p className="text-green-600 cursor-pointer font-semibold text-sm sm:text-base md:text-lg mr-4 flex items-center gap-1 hover:underline">
                                        See all
                                    </p>
                                </div>

                                {/* Products Grid */}
                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {item.products?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between"
                                        >
                                            {/* Image */}
                                            <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3">
                                                <img
                                                    src={
                                                        item.product_image && item.product_image !== ""
                                                            ? item.product_image
                                                            : "/src/Image/No image.jpg"
                                                    }
                                                    alt={item.product_name || "No Image"}
                                                    className="max-h-full object-contain"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <h4 className="font-semibold text-sm sm:text-base text-gray-800 h-10">
                                                {item.product_name}
                                            </h4>
                                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                                                {item.description}
                                            </p>

                                            {/* Price Section */}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-lg font-bold text-black">
                                                    ₹{item.price}
                                                </span>
                                                {item.cancle_price && (
                                                    <span className="text-sm text-red-500 line-through">
                                                        ₹{item.cancle_price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Button */}
                                            <button className="mt-4 px-3 py-2 border bg-green-50 border-green-500 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition text-sm font-medium">
                                                ADD
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </>
    );
};

export default Home;
















































