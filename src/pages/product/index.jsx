import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";

const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [singleProductData, setSingleProductData] = useState([])

    const product = {
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png",
        time: "14 MINS",
        name: "Amul Taaza Toned Milk",
        qty: "500 ml",
        price: "₹29",
    };
    const products = Array(6).fill(product);
    const displayProducts = [...products, ...products, ...products, ...products]

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
    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            {/* Main Cointaner */}
            <div className="w-full max-w-[1300px] pb-5">
                <div className="w-full p-2 grid grid-cols-1 border mt-[40px] rounded-md shadow-md border-gray-200 bg-gray-100 
sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {singleProductData?.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-3 hover:shadow-lg transition border-gray-200 bg-white"
                            onClick={() => navigate(`/single-product/${item.product_id}`)}
                        >
                            {console.log("item",item)}
                            
                            <img
                                src={item.product_image}
                                alt={item.name}
                                className="w-full h-[120px] sm:h-[140px] md:h-[150px] object-contain mb-2"
                            />
                            {/* <p className="text-black text-[10px] flex items-center gap-1 bg-gray-100 border rounded-2xl border-gray-100 w-15">
                                <i className="ri-time-line"></i> 14 MINS
                            </p> */}
                            <h4 className="font-semibold mt-1">{item.product_name}</h4>
                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                                {item.description}
                            </p>
                            {/* <p className="text-gray-600 text-[14px] mt-2">{item.qty}</p> */}
                            <div className="flex justify-between items-center mt-2">
                                <h5 className="font-bold text-[13px] mt-8">{item.price}</h5>
                                <button className="px-3 py-1 mt-8 border bg-green-50 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition text-sm">
                                    ADD
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
