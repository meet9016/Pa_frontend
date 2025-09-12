import React, { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router";
import Header from "../../component/Header";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Login from "../auth/Login";
import Aos from "aos";
// import PageMeta from "../utils.jsx/PageMeta";
import Skeleton from "react-loading-skeleton";

const Home = () => {

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false)

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await api.post(endPointApi.postHome, {});
      if (res.data && res.data.data) {
        setProduct(res.data.data || []);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Aos.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setShowLogin(true);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  // useEffect(() => {
  //     AOS.init({
  //         duration: 800,
  //         once: true,
  //     });
  // }, []);

  return (
    <>
      <Header />
      <div className="w-full pt-[60px] sm:pt-[80px] md:pt-[100px] bg-[#EAEBEF]">
        <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">

          {/* Login Modal */}
          {showLogin && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
              <div
                data-aos="fade-up"
                data-aos-duration="600"
                className="relative bg-white rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4"
              >
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-4 right-4 text-black text-xl"
                >
                  <i className="ri-close-large-line"></i>
                </button>
                <Login onClose={() => setShowLogin(false)} />
              </div>
            </div>
          )}

          {/* Banner */}
          <div className="w-full mt-6 sm:mt-8">
            {loading ? (
              <Skeleton
                className="w-full h-[200px] sm:h-[280px] md:h-[380px] lg:h-[480px] rounded-2xl"
                baseColor="#D1D5DB"
                highlightColor="#E5E7EB"
              />
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={15}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                className="rounded-2xl"
              >
                {product?.slider?.map((slide) => (
                  <SwiperSlide key={slide.slider_id}>
                    <img
                      src={slide.image}
                      alt="Slider"
                      className="w-full h-[200px] sm:h-[280px] md:h-[380px] lg:h-[480px] rounded-2xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Category Banners */}
          <div className="w-full mt-8 sm:mt-10">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-full h-40 sm:h-52 rounded-2xl"
                    baseColor="#D1D5DB"
                    highlightColor="#E5E7EB"
                  />
                ))}
              </div>
            ) : (
              <Swiper
                spaceBetween={15}
                slidesPerView={3}
                loop
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                  200: { slidesPerView: 2 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 3 },
                }}
                modules={[Autoplay]}
              >
                {product?.banner?.map((banners) => (
                  <SwiperSlide key={banners.banner_id}>
                    <img
                      src={banners.image}
                      alt="banner"
                      className="w-full h-40 sm:h-52 rounded-2xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* All Categories */}
          <div className="w-full mt-8 sm:mt-10">
            {loading ? (
              Array.from({ length: 2 }).map((_, catIdx) => (
                <div key={catIdx} className="mb-8 flex flex-col">
                  <Skeleton className="w-1/3 h-6 sm:h-8 mb-3" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <Skeleton className="w-[100px] h-[100px] rounded-xl" />
                        <Skeleton className="w-16 h-4 mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              product?.all_categories?.map((cat) => (
                <div key={cat.categories_id} className="mb-8 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      {cat.categories_name}
                    </h2>
                    {cat?.view_button && (
                      <button
                        onClick={() =>
                          navigate(`/category/${cat.categories_id}`)
                        }
                        className="px-4 py-2 rounded-lg bg-[#251c4b] text-white text-sm sm:text-base shadow hover:bg-[#3a2d6f] transition"
                      >
                        View More →
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4">
                    {cat.sub_categories?.map((sub) => (
                      <div
                        key={sub.sub_category_id}
                        className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                          navigate(`/product/${cat.categories_id}/${sub.sub_category_id}`)
                        }
                      >
                        <div className="p-3 sm:p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center">
                          <img
                            src={sub.image}
                            alt={sub.sub_category_name}
                            className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain"
                          />
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">
                          {sub.sub_category_name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default Home;
