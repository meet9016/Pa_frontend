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
        setProduct(res.data.data || []);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px]">
        {/* Main Container with fixed width */}
        <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">
          {/* Top Banner */}
          <div className="w-full mt-9 sm:mt-4 md:mt-1">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="rounded-2xl"
            >
              {product?.slider?.map((slide) => (
                <SwiperSlide key={slide.slider_id}>
                  <a href="#" rel="noopener noreferrer">
                    <img
                      src={slide.image}
                      alt="Slider"
                      className="
              w-full 
              h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] 
              rounded-2xl 
              object-cover
            "
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>



          {/* Three Category Cards */}
          <div className="w-full mt-9">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
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
                  <a href="#" rel="noopener noreferrer">
                    <img
                      src={banners.image}
                      alt="banner"
                      className="w-full rounded-2xl object-cover"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* All Categories with Subcategories */}
          <div className="w-full mt-9">
            {product?.all_categories?.map((cat) => (
              <div key={cat.categories_id} className="mb-9 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {cat.categories_name}
                  </h2>

                  <div className="flex items-center gap-4">
                    {cat?.view_button && (
                      <button
                        onClick={() =>
                          navigate(`/category/${cat.categories_id}`)
                        }
                        className="px-5 py-2 rounded-lg bg-[#251c4b] text-white font-medium text-sm sm:text-base shadow-md hover:bg-[#3a2d6f] hover:scale-105 transition"
                      >
                        View Mores →
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-4">
                  {cat.sub_categories?.map((sub) => (
                    <div
                      key={sub.sub_category_id}
                      className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div
                        className="p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center"
                        onClick={() => {
                          navigate(`/product/${cat.categories_id}/${sub.sub_category_id}`);
                        }}
                      >
                        <img
                          src={sub.image}
                          alt={sub.sub_category_name}
                          className="w-[120px] h-[120px] object-contain"
                        />
                      </div>

                      {/* sub_category_name fix */}
                      <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-2 text-center text-sm font-medium">
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
