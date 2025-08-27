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

    const images = Array(20).fill(
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png"
    );
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

    // useEffect(() => {
    //     AOS.init({
    //         duration: 800,
    //         once: true,
    //     });
    // }, []);




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



                    {/* Paan Corner Grid */}
                    {/* <div className="w-full grid grid-cols-2 border bg-white rounded-2xl border-white sm:grid-cols-5 md:grid-cols-10 mt-6">
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




                    {/* All Categories with Subcategories */}
                    <div className="w-full mt-8">
                        {product?.all_categories?.map((cat) => (
                            <div key={cat.categories_id} className="mb-10">
                                {console.log("cat", cat)}

                                {/* Category Name */}
                                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                                    {cat.categories_name}
                                </h2>

                                {/* Subcategories Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-4">
                                    {cat.sub_categories?.map((sub) => (
                                        <div
                                            key={sub.sub_category_id}
                                            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                                        >
                                            {console.log("asas", sub)}
                                            <div className="p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center"
                                                onClick={() => {
                                                    navigate(`/product/${cat.categories_id}/${sub.sub_category_id}`)
                                                }

                                                }>
                                                <img
                                                    src={sub.image}
                                                    alt={sub.sub_category_name}
                                                    className="w-[120px] h-[120px] object-contain"
                                                />
                                            </div>
                                            <p className="mt-5 text-center text-sm font-medium">
                                                {sub.sub_category_name}
                                            </p>

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





















































































