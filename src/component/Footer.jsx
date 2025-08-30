import React from 'react';

const Footer = () => {
    return (
        <div className="w-full bg-[#251c4b] text-white">
            <div className="w-full max-w-[1300px] mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row md:justify-between gap-8 border-white/20 pb-1">
                    {/* Logo */}
                    <img
                        src="/src/Image/footer.logo.png"
                        alt="PA Logo"
                        className="w-[150px] md:w-[200px]"
                    />


                    {/* Right side (Privacy + Terms + Social Icons together) */}
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 w-full">
                        {/* Privacy + Terms */}
                        <div className="flex flex-row gap-6 text-lg font-medium items-center">
                            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
                                <span>Privacy Policy</span>
                            </div>

                            <div className="w-[1px] h-6 bg-white/40"></div>

                            <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200">
                                <span>Terms & Conditions</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-4 text-3xl">
                            <i className="ri-instagram-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-pink-500"></i>
                            <i className="ri-facebook-circle-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-blue-500"></i>
                            <i className="ri-youtube-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-500"></i>
                            <i className="ri-pinterest-line cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-red-700"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className="w-full bg-[#ffffff] text-center text-black py-4 text-sm">
                <p>
                    © {new Date().getFullYear()} PA Company. All Rights Reserved. | Designed
                    with <i class="ri-heart-fill text-[16px] text-[#fd317b]"></i> by Shopno E-commerce Private Limited
                </p>
            </div>
        </div>


    );
};

export default Footer;
