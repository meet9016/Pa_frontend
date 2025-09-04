import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";

import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import Login from "../auth/Login";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [singleProductData, setSingleProductData] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showLogin, setShowLogin] = useState(false)

  const getSingleProductData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("product_id", id);
      

      // setLoading(true);
      const res = await api.post(endPointApi.postSingleProduct, formdata);

      if (res?.data && res?.data?.data) {
        setSingleProductData(res?.data?.data || []);
        if (res?.data?.data?.images?.length > 0) {
          setSelectedImage(res.data.data.images[0].image);
        }
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      // setLoading(false)
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const auth_token = localStorage.getItem("auth_token");
  const addToCart = () => {
    try {
      if (!auth_token) {
        setShowLogin(true)
        // toast.error("Please Loginss!")
      }
      const formdata = new FormData();
      formdata.append("product_id", id);
      formdata.append("quantity", count);
      formdata.append("type", 1);
      console.log("res0000111");

      api.post(endPointApi.postAddToCart, formdata).then((res) => {
        console.log("res0000", res);

        if (res.data.status == 200) {
          toast.success(res?.data?.message);
        }
      });
      // if (res.sta) console.log("res", res);
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      // setLoading(false)
    }
  };
  return (
    <div className="w-full px-2  sm:px-4 md:px-6 lg:px-8 pt-[60px] sm:pt-[80px] md:pt-[100px] flex flex-col items-center">
      <div className="w-full mt-4 max-w-[1300px]">
        {/* Breadcrumb */}
        <div className="text-sm sm:text-base text-gray-500 mb-4 flex flex-wrap gap-1">
          {" "}
          Home <i className="ri-arrow-right-s-line"></i>{" "}
          {singleProductData?.category_name}{" "}
          <i className="ri-arrow-right-s-line"></i>{" "}
          {singleProductData?.sub_category_name}{" "}
          <i className="ri-arrow-right-s-line"></i>{" "}
          {singleProductData?.product_name}{" "}
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

          <div className="mt-6 sm:mt-0 px-2 sm:px-4 lg:px-0 space-y-5">
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold">
              {singleProductData?.product_name}
            </h2>

            {/* Rating */}
            {/* <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="ri-star-fill"></i>
                                ))}
                            </div>
                            <button className="border border-gray-300 text-black text-xs sm:text-sm px-2 py-0.5 rounded">
                                3.00
                            </button>
                            <p className="text-gray-500 text-xs sm:text-sm">2 Reviews</p>
                        </div> */}

            {/* Description (short) */}
            <p className="text-sm sm:text-base text-gray-600">
              {singleProductData?.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-black text-3xl sm:text-4xl font-bold">
                ₹{singleProductData?.price}
              </span>
              {/* <span className="line-through text-red-500 text-base sm:text-lg font-medium">
                                ₹{singleProductData?.cancle_price}
                            </span> */}
            </div>

            {/* SKU Details Section (instead of hr line) */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                Product Details
              </h3>


              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex">
                  <span className="w-32 font-medium text-gray-900">SKU</span>
                  <span className="text-gray-600">
                    {singleProductData?.sku}
                  </span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium text-gray-900">
                    Category
                  </span>
                  <span className="text-gray-600">
                    {singleProductData?.category_name}
                  </span>
                </li>
                <li className="flex">
                  <span className="w-32 font-medium text-gray-900">
                    Sub Category
                  </span>
                  <span className="text-gray-600">
                    {singleProductData?.sub_category_name}
                  </span>
                </li>
              </ul>
            </div>




            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-auto justify-between">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="h-10 w-10 flex items-center justify-center text-2xl font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-6 text-xl font-semibold">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="h-10 w-10 flex items-center justify-center text-2xl font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4">
                <button
                  className="flex-1 bg-[#251C4B] hover:bg-[#1a1335] text-white py-3 rounded-lg flex items-center justify-center gap-3 text-lg cursor-pointer"
                  onClick={() => addToCart()}
                >
                  <i className="ri-shopping-cart-fill text-2xl"></i> Add to Cart
                </button>

                <button className="flex-1 bg-[green] hover:bg-[green] text-white py-3 rounded-lg flex items-center justify-center gap-3 text-lg cursor-pointer"
                  onClick={() => {
                    if (singleProductData?.whatsapp_inquiry_url) {
                      window.open(singleProductData.whatsapp_inquiry_url, "_blank");
                    }
                  }}
                >
                  <i className="ri-whatsapp-fill text-2xl"></i> Inquiry
                </button>
              </div>
            </div>



            {/* Wishlist, Share */}
            <div className="flex gap-6 text-sm sm:text-base text-black flex-wrap">
              {/* <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-heart-line"></i>
                                Add to wishlist
                            </div> */}
              {/* <div className="flex items-center gap-1 cursor-pointer">
                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-share-2-line"></i>
                Share this Product
              </div> */}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
          {/* Top Header Tabs */}
          <div className="flex gap-6 text-sm sm:text-base font-medium border-b border-gray-200 bg-gray-50 px-6 py-4 rounded-t-2xl">
            <button
              onClick={() => setActiveTab("description")}
              className={`transition pb-2 ${activeTab === "description"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`transition pb-2 ${activeTab === "additional"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              Additional Information
            </button>
            {/* Future Reviews Tab */}
            {/* <button className="pb-2 text-gray-500 hover:text-black">Reviews (2)</button> */}
          </div>

          {/* Bottom Content */}
          <div className="px-6 py-6 bg-white">
            {activeTab === "description" && (
              <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
                <p>{singleProductData?.long_description?.replace(/<[^>]+>/g, "")}</p>
              </div>
            )}

            {activeTab === "additional" && (
              <>
                {singleProductData?.additional ? (
                  <div className="space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
                    <p>{singleProductData.additional}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <img
                      src="https://superadmin.progressalliance.org/upload/web_logo/cat_product_no_found.jpeg"
                      alt="No Data Found"
                      className="w-64 h-64 sm:w-72 sm:h-72 opacity-80"
                    />
                    <p className="mt-4 text-gray-500 text-sm">No additional information available.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>


        <div className="mt-16 w-full">
          <div className="flex items-center justify-center pt-5 pb-5 mb-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#251C4B] relative">
              Related Products
              <span className="absolute left-1/2 -bottom-2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#251C4B] to-[#5D4D9E] rounded transform -translate-x-1/2"></span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
            {singleProductData?.related_products?.length > 0 ? (
              singleProductData.related_products.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative"
                >
                  {console.log("item", item)}

                  <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3 perspective-1000">
                    <div
                      className="w-full h-full relative group preserve-3d"
                      onClick={() => {
                        navigate(`/single-product/${item.product_id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >

                      {/* Front Image */}
                      <div className="absolute inset-0 backface-hidden transform  group-hover:scale-105 transition-all duration-500">
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
                      {/* <div className="absolute inset-0 backface-hidden transform rotate-y-180 transition-transform duration-700 group-hover:rotate-y-360">
                        <img
                          src={
                            item.product_image && item.product_image !== ""
                              ? item.product_image
                              : "/src/Image/No image.jpg"
                          }
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* Product Info */}
                  <h4 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
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
                    {/* {item.cancle_price && (
                      <span className="text-sm text-red-500 line-through">
                        ₹{item.cancle_price}
                      </span>
                    )} */}
                  </div>

                  {/* Button (Hidden until hover) */}
                  <button className="opacity-50 cursor-pointer group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg hover:bg-[#251c4b] transition text-md  font-bold">
                    View Product
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No related products available
              </p>
            )}
          </div>
        </div>
      </div>




      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
          <div className="relative  rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
            >
              <i class="ri-close-large-line"></i>
            </button>

            {/* Login Form */}
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

    </div >
  );
};
export default ProductDetails;
