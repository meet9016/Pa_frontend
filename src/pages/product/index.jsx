import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";

const Product = () => {
  const navigate = useNavigate();
  const { categories_id, sub_category_id } = useParams();
  const [singleProductData, setSingleProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState([]);

  const getSingleProductData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("categories_id", categories_id);
      formdata.append("sub_categories_id", sub_category_id);

      setLoading(true);
      const res = await api.post(
        endPointApi.postCategorySingleProduct,
        formdata
      );

      if (res?.data && res?.data?.data) {
        setSingleProductData(res?.data?.data?.products || []);
        setName(res?.data);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  useEffect(() => {
    getSingleProductData();
    AOS.init({
      duration: 800,
      once: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      <div className="w-full max-w-[1300px] mt-4 pb-5">
        <div className="w-full mb-12">
          <div className="flex items-center text-gray-500 text-sm sm:text-base mb-6">
            <a
              href="/"
              className="flex items-center space-x-1 hover:text-indigo-600 transition-colors"
            >
              <i className="ri-home-4-fill text-base sm:text-lg"></i>
              <span>Home</span>
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-gray-700">Categories</span>
          </div>
          
          <div className="text-center">
            <h2 className="inline-block relative text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {name?.data?.categories_name}
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></span>
            </h2>
            <p className="mt-2 text-gray-500 text-base sm:text-lg">
              Explore our latest collection in
              <span className="text-indigo-600 font-semibold">
                {" "}
                {name?.data?.categories_name}
              </span>
            </p>
          </div>
        </div>

        {/*  Show Loader First */}
        {loading ? (
          <div className="w-full mt-20 flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#251C4B] border-t-transparent"></div>
          </div>
        ) : singleProductData && singleProductData.length > 0 ? (
          //  Products Grid
          <div className="w-full p-2 grid grid-cols-1 mt-[40px] rounded-md  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {singleProductData?.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                onClick={() => navigate(`/single-product/${item.product_id}`)}
              >
                {/* Image */}
                <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3">
                  <img
                    src={
                      item.product_image && item.product_image !== ""
                        ? item.product_image
                        : "/src/Image/No image.jpg"
                    }
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Info */}
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 h-10">
                  {item.product_name}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-5 mt-3">
                  <span className="text-lg font-bold text-black">
                    ₹{item.price}
                  </span>
                  {/* {item.cancle_price && (
                                        <span className="text-sm text-red-500 line-through">
                                            ₹{item.cancle_price}
                                        </span>
                                    )} */}
                </div>

                {/* Read More */}
                <button className="opacity-50 group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg hover:bg-[#251c4b] transition text-md font-bold">
                  View Product
                </button>
              </div>
            ))}
          </div>
        ) : (
          //  No Data
          <div className="w-full mt-10 flex justify-center items-center h-[400px]">
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src="/src/Image/no-data.avif"
                alt="No Data Found"
                className="w-48 h-48 sm:w-60 sm:h-60 object-contain one-time-bounce"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-700">
                No Data Found
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Try adjusting your filters or check back later
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-5 py-2 bg-[#251C4B] text-white rounded-lg shadow-md hover:bg-[#372b63] transition"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
