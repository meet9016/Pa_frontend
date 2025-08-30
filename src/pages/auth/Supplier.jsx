import React, { useState } from "react";
import { toast } from "react-toastify";

const SupplierForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    gst: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Submit Supplier Form
  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.businessName)
      newErrors.businessName = "Business name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      // send to backend API (replace with your endpoint)
      // await api.post(`${endPointApi.supplierForm}`, formData);

      toast.success("Supplier form submitted successfully!");
      if (onClose) onClose();
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* LEFT */}
        <div className="hidden md:flex bg-[#251C4B] text-white rounded-2xl p-6 flex-col justify-between">
          {/* <div>
            <h2 className="text-2xl font-semibold leading-tight">Become a</h2>
            <h2 className="text-2xl font-semibold leading-tight">
              Progress Alliance Supplier
            </h2>
            <div className="mt-3 text-sm leading-6 text-white/90 text-justify">
              <p>
                Join us as a trusted supplier and collaborate with Progress
                Alliance. Provide your business details to get started with our
                partnership opportunities.
              </p>
            </div>
          </div> */}
          <div className="flex justify-center mt-4">
            <img
              src="/src/Image/seller.png"
              alt="Supplier Illustration"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center px-4 sm:px-5 py-6 bg-white rounded-2xl shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-gray-900">
              Supplier Registration
            </h3>
            <p className="mt-1 font-normal text-black text-[16px]">
              Please fill in your details
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.fullName}
                onChange={handleChange}
              />
              {error.fullName && (
                <p className="text-red-500 text-sm">{error.fullName}</p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.businessName}
                onChange={handleChange}
              />
              {error.businessName && (
                <p className="text-red-500 text-sm">{error.businessName}</p>
              )}
            </div>

            {/* GST Number (Optional) */}
            <div>
              <input
                type="text"
                name="gst"
                placeholder="GST Number (Optional)"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.gst}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div>
              <textarea
                name="address"
                placeholder="Full Address"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
              {error.address && (
                <p className="text-red-500 text-sm">{error.address}</p>
              )}
            </div>

            {/* City */}
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.city}
                onChange={handleChange}
              />
              {error.city && (
                <p className="text-red-500 text-sm">{error.city}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                value={formData.pincode}
                onChange={handleChange}
                maxLength={6}
              />
              {error.pincode && (
                <p className="text-red-500 text-sm">{error.pincode}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#251C4B] text-white py-3 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;
