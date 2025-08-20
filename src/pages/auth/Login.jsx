import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobile: "",
        otp: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onLoginClick = async () => {
        try {
            const formdata = new FormData();

            formdata.append("number", formData.mobile || "");
            formdata.append("otp", formData.otp);
            const res = await api.post(`${endPointApi.loginUser}`, formdata);

            if (res.data.status == 200) {
                saveToken(res.data.data.token)
                navigate("/home");
            }
        } catch (err) {
            // setError(err.message || "Invalid email or password. Please try again.");
        } finally {
            // setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen w-full bg-[#EAEBEF] flex items-center justify-center">
            {/* White card */}
            <div className="w-full max-w-[1100px] mx-auto bg-white rounded-xl shadow-sm px-[30px] sm:px-[50px] md:px-[70px] py-[40px] md:py-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LEFT: purple panel (hidden on small screens, visible on md+) */}
                    <div className="hidden md:flex bg-[#251C4B] text-white rounded-xl p-6 sm:p-8 flex-col justify-between">
                        {/* Heading + Text */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
                                Welcome to
                            </h2>
                            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
                                Progress Alliance
                            </h2>

                            <div className="mt-4 text-sm sm:text-[15px] leading-6 text-white/90 space-y-1 text-justify">
                                <p>
                                    Progress Alliance is a Nonprofit organization established in 2014 with 8 members consisting of entrepreneurs of varying business fields and with experiences. We focus on providing an environment for them to grow in the professional and personal aspects of their lives.
                                </p>
                            </div>
                        </div>

                        {/* Image at bottom */}
                        <div className="flex justify-center mt-6">
                            <img
                                src="/src/Image/Rectangle 3.png"
                                alt="Welcome Illustration"
                                className="w-full object-contain"
                            />
                        </div>
                    </div>

                    {/* RIGHT: form area */}
                    <div className="flex flex-col justify-center">
                        <div className="text-center">
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                                Welcome Back
                            </h3>
                            <p className="mt-2 font-normal text-black text-[22px]">
                                Please login to your account
                            </p>
                        </div>

                        {/* Inputs */}
                        <div className="mt-9 space-y-7">
                            <input
                                type="text"
                                name="mobile"
                                placeholder="Phone Number"
                                className="w-full max-w-lg mx-auto block rounded-md bg-gray-100 px-4 py-4 outline-none focus:ring-2 ring-[#251C4B]/30 placeholder-black"
                                value={formData.mobile}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="otp"
                                className="w-full max-w-lg mx-auto block rounded-md bg-gray-100 px-4 py-4 outline-none focus:ring-2 ring-[#251C4B]/30 placeholder-black"
                                placeholder="Enter your otp"
                                value={formData.otp}
                                onChange={handleChange}
                            />
                            <p className="text-right text-xs text-black cursor-pointer max-w-lg mx-auto">
                                Forgot Password ?
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 space-y-4 max-w-lg mx-auto w-full">
                            <button className="w-full bg-[#251C4B] text-white py-4 rounded-md font-medium hover:bg-[#251C4B]/90 transition"
                                onClick={onLoginClick}
                            >
                                Login
                            </button>
                            <p className="text-center text-md text-black">
                                Don’t have an account ?{" "}
                                <span className="text-[#251C4B] cursor-pointer">Sign up</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
