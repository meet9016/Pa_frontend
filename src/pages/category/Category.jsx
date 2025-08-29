import React, { useEffect, useMemo, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Header from "../../component/Header";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import { useParams, useNavigate } from "react-router";

import AOS from "aos";
import "aos/dist/aos.css";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      setLoading(true);
      const res = await api.post(endPointApi.postHome, {});
      if (res?.data?.data) {
        setCategory(res.data.data.all_categories || []);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // pick the category that matches the param (string-compare for safety)
  const selectedCategory = useMemo(
    () => category.find(c => String(c?.categories_id) === String(categoryId)),
    [category, categoryId]
  );

  return (
    <>
      <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">
        <div className="w-full mt-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[170px] bg-gray-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : !selectedCategory ? (
            <p className="text-center py-10 text-gray-600">
              No category found for ID <span className="font-semibold">{categoryId}</span>.
            </p>
          ) : (
            <div key={selectedCategory.categories_id} className="mb-10">
              {/* Category Name */}
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                {selectedCategory.categories_name}
              </h2>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-4">
                {selectedCategory.sub_categories?.map((sub, i) => (
                  <div
                    key={String(sub?.sub_category_id ?? i)}
                    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div
                      className="p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center"
                      onClick={() =>
                        navigate(`/product/${selectedCategory.categories_id}/${sub.sub_category_id}`)
                      }
                    >
                      <img
                        src={sub.image}
                        alt={sub.sub_category_name}
                        className="w-[120px] h-[120px] object-contain"
                        loading={i < 4 ? "eager" : "lazy"}
                      />
                    </div>
                    <p className="mt-5 text-center text-sm font-medium">
                      {sub.sub_category_name}
                    </p>
                  </div>
                ))}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};


export default Category;
