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
  console.log("category", category);
  console.log("loading", loading);


  const getCategory = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('categories_id', categoryId)
      const res = await api.post(endPointApi.viewSubcategoryList, formData);
      console.log("res?.data?.data", res?.data?.data);

      if (res?.data?.data) {
        setCategory(res.data.data.sub_categories || []);
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
        <div className="w-full mt-30">

          {!loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-4">
              {category?.map((sub) => (
                <div
                  key={sub.sub_category_id}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div
                    className="p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center"
                    onClick={() => {
                      navigate(`/single-product/${sub.categories_id}/${sub.sub_category_id}`);
                    }}
                  >
                    <img
                      src={sub.image}
                      alt={sub.sub_category_name}
                      className="w-[120px] h-[120px] object-contain"
                    />
                  </div>

                  {/* sub_category_name fix */}
                  <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center text-sm font-medium">
                    {sub.sub_category_name}
                  </p>
                </div>
              ))}
            </div>
          ) : !selectedCategory ? (
            <p className="text-center py-10 text-gray-600">
              No category found for ID <span className="font-semibold">{categoryId}</span>.
            </p>
          ) : (
            <div key={selectedCategory.categories_id} className="mb-10">
              {/* Category Name */}
              {/* <h2 className="text-lg sm:text-xl font-semibold mt-15 mb-4">
                {selectedCategory.categories_name}
              </h2> */}

              <div className="text-sm sm:text-base text-gray-500 mb-4  mt-15  flex flex-wrap gap-1">
                Home <i className="ri-arrow-right-s-line"></i> {selectedCategory.categories_name}{" "}
              </div>
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
