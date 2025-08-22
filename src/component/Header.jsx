import React, { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate()
    const alreadyLogin = localStorage.getItem('auth_token')
    const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
    const handleAddcart = () => {
        setShowCart(true)
    }

    const cartItem = {
        name: "Kurkure Chatka Pataka",
        weight: "3 x 39 g",
        price: 54,
        qty: 1,
        image: "/src/Image/Fruits-and-Vegetables.jpg"
    }
    const cartItems = Array(3).fill(cartItem)
    return (
        <>
            <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[60px] md:h-[80px]">

                    {/* Left: Logo + Text */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <img
                            src="/src/Image/PA-Logo.png"
                            alt="Logo"
                            className="w-28 sm:w-32 md:w-40"
                        />
                        {/* Divider + Text (hide on mobile) */}
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="w-px h-12 md:h-20 bg-gray-200"></div>
                            <div className="flex flex-col leading-tight px-2">
                                <span className="font-bold text-[13px] sm:text-[15px] md:text-[17px]">
                                    Welcome to the world
                                </span>
                                <span className="font-bold text-[13px] sm:text-[15px] md:text-[17px]">
                                    of Possibilities
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1 md:px-4 md:py-2 flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-4">
                        <i className="ri-search-line text-black text-lg mr-2"></i>
                        <input
                            type="text"
                            placeholder='Search "grocery"'
                            className="bg-transparent outline-none border-none focus:ring-0 h-[28px] flex-1 text-[13px] sm:text-[14px] md:text-[15px] placeholder-gray-500"
                        />
                    </div>

                    {/* Right Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Supplier Link */}
                        <button
                            onClick={() => navigate("https://pa-admin-panel.vercel.app/signin")}
                            className="text-black text-[13px] sm:text-[14px] md:text-[15px] font-medium hover:underline"
                        >
                            Supplier
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={handleAddcart}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold"
                        >
                            <i className="ri-shopping-cart-2-line text-black"></i>
                            My Cart
                        </button>

                        {/* Login Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold"
                        >
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex items-center gap-2 p-2 rounded-md bg-gray-100"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <i className="ri-menu-line text-xl"></i>
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <div
                    className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${showMenu ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={() => setShowMenu(false)}>
                            <i className="ri-close-line text-xl"></i>
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 p-6">
                        <button
                            onClick={() => navigate("https://pa-admin-panel.vercel.app/signin")}
                            className="text-black font-medium"
                        >
                            Supplier
                        </button>
                        <button
                            onClick={handleAddcart}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg text-black font-semibold"
                        >
                            <i className="ri-shopping-cart-2-line"></i>
                            My Cart
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg text-black font-semibold"
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* Cart Drawer (already responsive in your code) */}
            </header>
        </>
    );
};

export default Header;