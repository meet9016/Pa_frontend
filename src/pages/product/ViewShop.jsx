import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router'
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';

const ViewShop = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [alldata, setAllData] = useState([]);
    const [supplierData, setSupplierData] = useState({})
    const [loading, setLoading] = useState(false)


    const getData = async () => {
        try {

            const formData = new FormData();
            formData.append('supplier_details_id', id)
            setLoading(true)
            const res = await api.post(endPointApi.supplierProductList, formData)
            if (res.data && res.data.data) {
                setAllData(res.data.data)
                setSupplierData(res.data.data.supplier_details)
            } else {
                console.log("Not Data")
            }
        } catch (err) {
            console.log("Error", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            <div className="w-full max-w-[1300px] mt-4 pb-5">

                <div className="flex items-center mt-[20px] gap-6 p-6 bg-white  rounded-lg shadow-md flex-wrap">
                    {/* Icon */}
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#251c4b]/10 text-[#251c4b] text-5xl shadow-sm">
                        <i className="ri-store-3-line"></i>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-[200px]">
                        {/* Company Name */}
                        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
                            {supplierData.company_name} {/* "PA 22 SANKALP" */}
                        </h4>

                        {/* Short Name + Stats in one row */}
                        <div className="flex items-center gap-6 mt-2 text-gray-700 flex-wrap">
                            {/* Short Name */}
                            <p className="text-base sm:text-lg font-medium whitespace-nowrap">
                                {supplierData.chapter_short_name}
                            </p>

                            {/* Stats */}
                            <span className="flex items-center gap-1 text-gray-600 whitespace-nowrap">
                                <span className="font-bold text-2xl text-[#251c4b]">{supplierData.total_products}</span> Products
                            </span>
                        </div>

                    </div>

                    {/* Follow Button */}
                    {/* <button className="bg-[#251c4b] cursor-pointer text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#251c4b] transition">
                        Contact
                    </button> */}
                </div>




                {loading ? (
                    <div className="w-full mt-20 flex justify-center items-center h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#251C4B] border-t-transparent"></div>
                    </div>
                ) : alldata?.product_details && alldata?.product_details.length > 0 ? (
                    <div className="w-full p-2 grid grid-cols-1 mt-[30px] rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {alldata?.product_details?.map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                                onClick={() => navigate(`/single-product/${item.product_id}`)}
                            >
                                {/* Product Image */}
                                <div className="w-full h-[160px] flex items-center justify-center mb-3 overflow-hidden">
                                    <img
                                        src={item.product_image || "/src/Image/No image.jpg"}
                                        alt={item.product_name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                                {/* Product Name */}
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                                    {item.product_name}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-2">
                                    {item.description?.replace(/<[^>]+>/g, "") || "No description available"}
                                </p>

                                {/* Price Section */}
                                <div className="flex items-center gap-3 mt-3">
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
                                <button
                                    className="
          opacity-100 sm:opacity-50 sm:group-hover:opacity-100
          cursor-pointer mt-4 px-3 py-2 
          border bg-[#251c4b] border-[#251c4b] 
          text-white rounded-lg 
          transition text-md
        "
                                >
                                    View Product
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full mt-10 flex justify-center items-center h-[400px]">
                        <div className="flex flex-col items-center justify-center text-center">
                            <img
                                src="https://superadmin.progressalliance.org/upload/web_logo/not-found.png"
                                alt="No Data Found"
                                className="w-48 h-48 sm:w-60 sm:h-60 object-contain one-time-bounce"
                            />
                            <h2 className="mt-4 text-xl font-semibold text-gray-700">
                                No Product Found
                            </h2>

                            <button
                                onClick={() => navigate("/")}
                                className="mt-6 px-5 py-2 bg-[#251C4B] text-white rounded-lg cursor-pointer shadow-md hover:bg-[#372b63] transition"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ViewShop
