import React, { useState } from "react";

const Header = () => {
    const [showCart, setShowCart] = useState(false);

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
        <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md h-auto md:h-[80px] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-full flex-wrap md:flex-nowrap gap-3">

                <div className="flex items-center gap-4 flex-shrink-0 min-w-[160px]">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/src/Image/PA-Logo.png"
                            alt="Logo"
                            className="w-32 sm:w-36 md:w-40"
                        />
                        {/* Vertical Line */}
                        <div className="hidden sm:block w-px h-20 md:h-20 bg-gray-200"></div>
                    </div>

                    {/* Welcome Text */}
                    <div className="hidden sm:flex flex-col leading-tight px-2">
                        <span className="font-bold text-[13px] sm:text-[15px] md:text-[17px]">
                            Welcome to the world
                        </span>
                        <span className="font-bold text-[13px] sm:text-[15px] md:text-[17px]">
                            of Possibilities
                        </span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1 md:px-4 md:py-2 flex-1 max-w-full sm:max-w-[500px] md:max-w-[650px] lg:max-w-[800px] order-last md:order-none">
                    <i className="ri-search-line text-black text-lg mr-2 md:mr-3"></i>
                    <input
                        type="text"
                        placeholder='Search "grocery"'
                        className="bg-transparent outline-none border-none focus:ring-0 h-[28px] w-[90%] sm:w-[92%] md:w-[95%] text-[13px] sm:text-[14px] md:text-[15px] placeholder-gray-500"
                    />
                </div>




                {/* Supplier Link */}
                <div className="hidden sm:flex flex-col justify-center text-right">
                    <span className="text-black text-[13px] sm:text-[14px] md:text-[15px] font-medium">
                        Become a
                    </span>
                    <span className="text-black text-[13px] sm:text-[14px] md:text-[15px] font-medium">
                        Supplier
                    </span>
                </div>

                {/* Cart Button */}
                <button
                    onClick={handleAddcart}
                    className="flex items-center gap-2 cursor-pointer bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold whitespace-nowrap"
                >
                    <i className="ri-shopping-cart-2-line text-black rounded-full p-1 text-lg"></i>
                    My Cart
                </button>

                {/* Show Cart */}
                <div
                    className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                        <h2 className="text-2xl font-bold">My Cart</h2>
                        <button onClick={() => setShowCart(false)}>
                            <i className="ri-close-large-fill cursor-pointer text-xl"></i>
                        </button>
                    </div>

                    {/* Cart Items (Scrollable) */}
                    <div className="flex-1 overflow-y-auto bg-[#F5F7FD] p-4">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                            {/* Items List */}
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-15 h-15 border p-1 border-gray-300 object-cover rounded"
                                            />
                                            <div>
                                                <h5 className="text-sm font-medium">{item.name}</h5>
                                                <p className="text-xs text-gray-500">{item.weight}</p>
                                                <h6 className="text-black font-bold">₹{item.price}</h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-green-600 text-white rounded">
                                            <button className="px-2 py-1">-</button>
                                            <span className="px-2">{item.qty}</span>
                                            <button className="px-2 py-1">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#3E8E1F] text-white px-4 py-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-extrabold leading-none">₹316</h3>
                            <p className="text-sm font-bold tracking-wide">TOTAL</p>
                        </div>
                        <button className="flex items-center gap-2 text-lg font-semibold">
                            Order On Whatsapp
                            <i className="ri-arrow-right-s-line text-xl"></i>
                        </button>
                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
