import React from 'react';
import { useNavigate } from 'react-router';

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full px-4 bg-[#4F3D9C] flex mt-[80px] justify-center text-white">
        {/* <div className="w-full px-4 bg-[#4F3D9C] flex mt-[80px] justify-center text-white"> */}
            <div className="w-full max-w-[1300px] pb-5">
                <div className="flex p-5 flex-col md:flex-row md:justify-between gap-8">                                                                                  
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                        <img
                            src="https://pa.2-min.in/upload/web_logo/footer-pa_logo.png"
                            alt="PA Logo"
                            className="w-[180px] md:w-[250px]"
                        />
                    </div>

                    {/* Middle Sections */}
                    <div className="flex flex-col sm:flex-row gap-30 flex-wrap">
                        {/* Our Policy */}
                        <div>
                            <h2 className="text-lg font-bold mb-3">Our Policy</h2>
                            <div className="space-y-2 text-sm md:text-base">
                                <p>Privacy Policy</p>
                                <p>Shipping Policy</p>
                                <p>Return & Refund Policy</p>
                                <p>Term & Condition</p>
                            </div>
                        </div>

                        {/* Our Values */}
                        <div>
                            <h2 className="text-lg font-bold mb-3">Our Values</h2>
                            <div className="space-y-2 text-sm md:text-base">
                                <p onClick={() => navigate('/')}>Home</p>
                                <p>About Us</p>
                                <p>Shop</p>
                                <p>All Categories</p>
                            </div>
                        </div>

                        {/* About Us */}
                        <div className="max-w-[300px]">
                            <h2 className="text-lg font-bold mb-3">About Us</h2>
                            <p className="text-sm md:text-base leading-relaxed mb-4">
                                Progress Alliance is a Nonprofit organization established in 2014 with 8 members
                                consisting of entrepreneurs of varying business fields and with experiences.
                            </p>
                            <div className="flex gap-3 text-2xl">
                                <i className="ri-instagram-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-pink-500"></i>
                                <i className="ri-facebook-circle-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-blue-500"></i>
                                <i className="ri-youtube-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-500"></i>
                                <i className="ri-pinterest-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-700"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
