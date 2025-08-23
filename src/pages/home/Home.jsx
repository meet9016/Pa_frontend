import React, { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router";
import Header from "../../component/Header";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);


    return (
        <>
            <Header />

            <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px]">
                {/* Main Container with fixed width */}
                <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">

                    {/* Top Banner */}
                    {/* <div className="w-full">
                        {product?.slider?.map((slide) => (
                            <img
                                key={slide.slider_id}
                                src={slide.image}
                                alt="Slider"
                                className="w-full h-auto rounded-2xl object-contain"
                            />
                        ))}
                    </div> */}
                    {loading ? (
                        <div
                            className="w-full h-64 rounded-2xl bg-gray-300 animate-pulse mb-4"
                        />
                    ) : (
                        product?.slider?.map((slide) => (
                            <img
                                key={slide.slider_id}
                                src={slide.image}
                                alt="Slider"
                                className="w-full h-auto rounded-2xl object-contain"
                            />
                        ))
                    )}
                    {/* Three Category Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-60 rounded-2xl bg-gray-300 animate-pulse"
                                />
                            ))
                        ) : (
                            product?.banner?.map((slide) => (
                                <img
                                    key={slide.banner_id}
                                    src={slide.image}
                                    className="w-full rounded-2xl object-cover"
                                    alt="Banner"
                                />
                            ))
                        )}
                    </div>
                    <div className="w-full pt-10">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                                Shop by Category
                            </h2>
                        </div>

                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={3}
                            breakpoints={{
                                640: { slidesPerView: 4 },
                                768: { slidesPerView: 5 },
                                1024: { slidesPerView: 6 },
                            }}
                            navigation
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="w-full"
                        >
                            {loading
                                ? Array.from({ length: 6 }).map((_, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col items-center">
                                            {/* Circle Skeleton */}
                                            <div className="w-[130px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full bg-gray-300 animate-pulse" />
                                            {/* Text Skeleton */}
                                            <div className="w-20 h-4 mt-4 bg-gray-200 rounded animate-pulse" />
                                        </div>
                                    </SwiperSlide>
                                ))
                                : product?.categories?.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            onClick={() => navigate(`/product/${item.categories_id}`)}
                                            className="cursor-pointer flex flex-col items-center group"
                                        >
                                            {/* Circle wrapper */}
                                            <div className="relative w-[130px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={item?.image}
                                                    alt={item?.categories_name}
                                                    className="w-[90%] h-[90%] object-cover rounded-full transition-all duration-300 group-hover:w-full group-hover:h-full"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Category Name */}
                                            <h5 className="mt-4 text-center text-[12px] sm:text-[15px] md:text-[16px] font-semibold text-[#251c4b] tracking-wide transition-all group-hover:text-[#1a1335] group-hover:font-bold">
                                                {item?.categories_name}
                                            </h5>
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>

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
                                            data-aos="fade-up"
                                            className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                                        >
                                            <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3 perspective-1000">
                                                <div className="w-full h-full relative group preserve-3d">
                                                    {/* Front Image */}

                                                    <div className="absolute inset-0 backface-hidden transition-transform duration-700 transform group-hover:rotate-y-180">
                                                        <img
                                                            src={
                                                                item.product_image && item.product_image !== ""
                                                                    ? item.product_image[0].image
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
                                                                item.product_image?.[1]?.image ??
                                                                item.product_image?.[0]?.image ??
                                                                "/src/Image/No image.jpg"
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
                                                <span className="text-lg font-bold text-black">
                                                    ₹{item.price}
                                                </span>
                                                {item.cancle_price && (
                                                    <span className="text-sm text-red-500 line-through">
                                                        ₹{item.cancle_price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Read More Button (Hover par show hoga) */}
                                            <button className="opacity-0 group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg hover:bg-[#1a1335] transition text-md font-bold">
                                                Read More
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
















































