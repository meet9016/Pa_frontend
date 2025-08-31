import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from "../pages/utils.jsx/axiosInstance";
import endPointApi from "../pages/utils.jsx/endPointApi";
import { toast } from "react-toastify";
import Login from "../pages/auth/Login";
import debounce from 'lodash.debounce';
import SupplierForm from "../pages/auth/Supplier";

const Header = () => {
    const navigate = useNavigate()
    const alreadyLogin = localStorage.getItem('auth_token')
    const [showCart, setShowCart] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [cardList, setCardList] = useState([]);
    const [totalAmount, setTotalAmount] = useState();
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const [counts, setCounts] = useState({});

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFullResults, setShowFullResults] = useState(false);
    const [showSupplier, setShowSupplier] = useState(false);
    const wrapperRef = useRef(null);

    const fetchSuggestions = async (searchText) => {
        if (!searchText) {
            setResults([]);
            return;
        }

        const formData = new FormData();
        formData.append('search', searchText);

        try {
            const response = await api.post(
                endPointApi.autoSuggestionProductList,
                formData
            );
            const data = response.data.data;
            setResults(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setResults([]);
        }
    };

    const handleShowAllResults = async () => {
        navigate(`/search/${query}`)
    };
    const handleIncrement = async (cart_id, p_id) => {
        // naya quantity calculate karo
        const newQuantity = (counts[cart_id] || 1) + 1;

        // UI update
        setCounts((prev) => ({
            ...prev,
            [cart_id]: newQuantity,
        }));

        try {
            const formdata = new FormData();
            formdata.append("product_id", p_id);
            formdata.append("quantity", newQuantity);
            formdata.append("type", 2);

            const res = await api.post(endPointApi.postAddToCart, formdata);

            if (res.data.status === 200) {
                toast.success(res?.data?.message);
            }
        } catch (err) {
            console.log("Error Fetch data", err);
        }
    };


    const handleDecrement = async (cart_id, p_id) => {
        const newQuantity = counts[cart_id] > 1 ? counts[cart_id] - 1 : 1;

        setCounts((prev) => ({
            ...prev,
            [cart_id]: newQuantity,
        }));

        try {
            const formdata = new FormData();
            formdata.append("product_id", p_id);
            formdata.append("quantity", newQuantity);
            formdata.append("type", 2);

            const res = await api.post(endPointApi.postAddToCart, formdata);

            if (res.data.status === 200) {
                toast.success(res?.data?.message);
            }
        } catch (err) {
            console.log("Error Fetch data", err);
        }
    };

    const handleAddcart = async () => {
        setShowCart(true)
        try {
            const res = await api.post(`${endPointApi.postCartList}`, {});

            if (res?.data && res?.data?.data) {
                setCardList(res?.data?.data?.cart_list || [])
                setTotalAmount(res?.data?.data?.cart_total)
            }
        } catch (err) {
            console.log("Error data", err)
        } finally {
        }
    }

    // const addToCart = () => {
    //     const p_id = cardList.map((i) => i.product_id.join(', '))
    //     console.log(p_id, 'qq')
    //     try {
    //         const formdata = new FormData();
    //         formdata.append("product_id", p_id);
    //         formdata.append("quantity", count);
    //         formdata.append("type", 2);

    //         api.post(endPointApi.postAddToCart, formdata).then((res) => {
    //             if (res.data.status == 200) {
    //                 toast.success(res?.data?.message)
    //             }
    //         })
    //         if (res.sta)
    //             console.log("res", res);
    //     } catch (err) {
    //         console.log("Error Fetch data", err)
    //     } finally {
    //         // setLoading(false)
    //     }
    // }

    const addToCart = async (productId, quantity) => {
        try {
            const formData = new FormData();
            formData.append("product_id", productId);
            formData.append("quantity", quantity);
            formData.append("type", 2);

            setLoading(true);
            const res = await api.post(`${endPointApi.postAddToCart}`, formData);

            if (res.data && res.data.data) {
                console.log("Cart Updated:", res.data.data);
            }
        } catch (err) {
            console.log(err, "ERROR");
        } finally {
            setLoading(false);
        }
    };

    const orderOnWhatsapp = () => {
        if(!alreadyLogin){
            toast.error("Please login!")
            return
        }
        try {
            api.post(`${endPointApi.postOrderWiaWhatsapp}`, {}).then((res) => {
                if (res.data.status == 200) {
                    setShowCart(false)
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            })
        } catch (err) {
            console.log("Error Fetch data", err)
        } finally {
            // setLoading(false)
        }
    }

    const debouncedFetch = debounce(fetchSuggestions, 300);

    useEffect(() => {
        debouncedFetch(query);
        return () => debouncedFetch.cancel();
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[60px] md:h-[80px]">

                    {/* Left: Logo + Text */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <img
                            src="https://pa.2-min.in/upload/web_logo/20250816095817_8272.png"
                            alt="Logo"
                            className="w-28 sm:w-32 md:w-40 cursor-pointer"
                            onClick={() => navigate('/')}
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

                    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-4">
                        {/* Search Box */}
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1 md:px-4 md:py-2 flex-1">
                            <i className="ri-search-line text-black text-lg mr-2"></i>
                            <input
                                type="text"
                                placeholder='Search "grocery"'
                                className="bg-transparent outline-none border-none focus:ring-0 h-[28px] flex-1 text-[14px] placeholder-gray-500"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setShowDropdown(true);
                                }}
                            />
                            {query && (
                                <button onClick={() => setQuery("")} className="text-gray-400 text-xl">
                                    &times;
                                </button>
                            )}
                        </div>

                        {/* Dropdown */}
                        {showDropdown && results.length > 0 && (
                            <div className="absolute left-0 right-0 bg-white rounded-lg shadow-lg mt-2 max-h-180 overflow-y-auto z-10">
                                <ul>
                                    {results.map((item) => (
                                        <li
                                            key={item.product_id}
                                            className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setQuery(item.product_name);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-10 h-10 object-cover rounded mr-3"
                                            />
                                            <span className="text-sm">{item.product_name}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Show All Results Option */}

                                <div className="w-full text-center px-4 py-4">
                                    <button
                                        onClick={handleShowAllResults}
                                        className="inline-flex items-center gap-3 text-base font-semibold transition-all duration-300"
                                        style={{ color: "#251C4B" }}
                                    >
                                        View more
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="#251C4B"
                                            className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.25 8.25L21 12l-3.75 3.75M21 12H3"
                                            />
                                        </svg>
                                    </button>
                                </div>


                            </div>
                        )}
                    </div>


                    {/* Right Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Supplier Link */}
                        <button
                            onClick={() => setShowSupplier(true)}
                            className="text-black text-[13px] sm:text-[14px] md:text-[15px] font-medium hover:underline"
                        >
                            Become a Supplier
                        </button>

                        {/* Cart Button */}
                        <button
                            onClick={handleAddcart}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold cursor-pointer"
                        >
                            <i className="ri-shopping-cart-2-line text-black"></i>
                            {/* My Cart */}
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
                                    {cardList && cardList.length > 0 ? (
                                        <div className="w-full space-y-4">
                                            {cardList.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between border-b pb-3 last:border-none"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={item.product_images}
                                                            alt={item.product_name}
                                                            className="w-16 h-16 border p-1 border-gray-300 object-cover rounded"
                                                        />
                                                        <div>
                                                            <h5 className="text-sm font-medium">{item.product_name}</h5>
                                                            <p className="text-xs text-gray-500">{item.weight}</p>
                                                        </div>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center bg-green-600 text-white rounded">
                                                        <button
                                                            className="px-2 py-1"
                                                            onClick={() => handleDecrement(item.cart_id, item.product_id)}
                                                        >
                                                            -
                                                        </button>

                                                        <span className="px-2 text-lg font-semibold">
                                                            {item.quantity || 1}
                                                        </span>

                                                        <button
                                                            className="px-2 py-1"
                                                            onClick={() => handleIncrement(item.cart_id, item.product_id)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center py-10">
                                            <img
                                                src="https://pa.2-min.in/upload/web_logo/empaty.jpg"
                                                alt="Empty cart"
                                                className="w-40 opacity-80"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Footer */}
                            <div className="bg-[#F5F7FD] px-4 py-3">
                                <div className="bg-[#251c4b] text-white rounded-lg shadow-sm p-4 flex items-center justify-between"
                                    onClick={orderOnWhatsapp}
                                >
                                    {/* <div>
                                        <h3 className="text-2xl font-extrabold leading-none">₹{totalAmount}</h3>
                                        <p className="text-sm font-bold tracking-wide">TOTAL</p>
                                    </div> */}
                                    {/* Left side: WhatsApp icon + text */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="bg-[#25d366] text-white px-2 py-1 rounded-lg flex items-center justify-center"
                                        >
                                            <i className="ri-whatsapp-fill text-2xl"></i>
                                        </button>
                                        <p className="text-[18px] font-bold">Inquiry On Whatsapp</p>
                                    </div>

                                    {/* Right side: Arrow */}
                                    <i className="ri-arrow-right-s-line text-xl"></i>
                                </div>
                            </div>


                        </div>



                        {/* Login Button */}
                        {/* <button
                            
                            onClick={() => setShowLogin(true)}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold cursor-pointer"
                        >
                            {alreadyLogin ? 'Logout' : 'Login'}
                            
                        </button> */}


                        <button
                            onClick={() => {
                                if (alreadyLogin) {
                                    // Logout
                                    localStorage.removeItem("auth_token");
                                    toast.success("Logged out successfully!");
                                    navigate("/");
                                    window.location.reload();
                                } else {
                                    // Show login modal
                                    setShowLogin(true);
                                }
                            }}
                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 md:px-4 rounded-lg text-black font-semibold cursor-pointer"
                        >
                            <i className="ri-user-3-line"></i>
                            {alreadyLogin ? "Logout" : "Login"}
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

                {showLogin && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
                        <div className="relative  rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4">
                            <button
                                onClick={() => setShowLogin(false)}
                                className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
                            >
                                <i class="ri-close-large-line"></i>
                            </button>

                            {/* Login Form */}
                            <Login onClose={() => setShowLogin(false)} />
                        </div>
                    </div>
                )}
                {showSupplier && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
                        <div className="relative rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4">
                            <button
                                onClick={() => setShowSupplier(false)}
                                className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
                            >
                                <i className="ri-close-large-line"></i>
                            </button>

                            <SupplierForm onClose={() => setShowSupplier(false)} />
                        </div>
                    </div>
                )}

            </header>
        </>
    );
};

export default Header;