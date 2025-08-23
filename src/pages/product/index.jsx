import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";

const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [singleProductData, setSingleProductData] = useState([])

    

    const getSingleProductData = async () => {
        try {
            const formdata = new FormData();
            formdata.append("categories_id", id);

            // setLoading(true);
            const res = await api.post(endPointApi.postCategorySingleProduct, formdata);

            if (res?.data && res?.data?.data) {
                setSingleProductData(res?.data?.data?.products || [])
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
        getSingleProductData();
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            {/* Main Cointaner */}
            {/* <div className="w-full max-w-[1300px] pb-5">
                <div className="w-full p-2 grid grid-cols-1 border mt-[40px] rounded-md shadow-md border-gray-200 bg-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {singleProductData?.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-3 hover:shadow-lg transition border-gray-200 bg-white"
                            onClick={() => navigate(`/single-product/${item.product_id}`)}
                        >
                            {console.log("item", item)}

                            <img
                                src={item.product_image}
                                alt={item.name}
                                className="w-full h-[120px] sm:h-[140px] md:h-[150px] object-contain mb-2"
                            />
                         
                            <h4 className="font-semibold mt-1">{item.product_name}</h4>
                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                                {item.description}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <h5 className="font-bold text-[13px] mt-8">{item.price}</h5>
                                <button className="px-3 py-1 mt-8 border bg-green-50 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition text-sm">
                                    ADD
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}





            <div className="w-full max-w-[1300px] pb-5">
                <div className="w-full p-2 grid grid-cols-1 border mt-[40px] rounded-md shadow-md border-gray-200 bg-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {singleProductData?.map((item, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                            onClick={() => navigate(`/single-product/${item.product_id}`)}
                        >
                            {/* Image */}
                            {/* <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3 overflow-hidden">
                                <img
                                    src={item.product_image}
                                    alt={item.name}
                                    className="max-h-full object-contain transform group-hover:scale-105 transition-all duration-500"
                                />
                            </div> */}
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

                            {/* Read More */}
                            <button className="opacity-0 group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg hover:bg-[#251c4b] transition text-md  font-bold">
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Product;
