import React from "react";

const SubDetail = () => {
    const product = {
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png",
        time: "14 MINS",
        name: "Amul Taaza Toned Milk",
        qty: "500 ml",
        price: "₹29",
    };
    const products = Array(6).fill(product);
    const displayProducts = [...products, ...products];

    return (
        <div className="w-full px-2  sm:px-4 md:px-6 lg:px-8 pt-[60px] sm:pt-[80px] md:pt-[100px] flex flex-col items-center">
            <div className="w-full mt-4 max-w-[1300px]">
                {/* Breadcrumb */}
                <div className="text-sm sm:text-base text-gray-500 mb-4 flex flex-wrap gap-1">
                    Home <i className="ri-arrow-right-s-line"></i> Fruits & Vegetables{" "}
                    <i className="ri-arrow-right-s-line"></i> Exotic Fruits & Veggies{" "}
                    <i className="ri-arrow-right-s-line"></i> Marketside Fresh Organic Bananas, Bunch
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT PART */}
                    <div>
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src="/src/Image/Banana.png"
                                alt="Banana"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-2 justify-center mt-4 flex-wrap">
                            {[...Array(3)].map((_, i) => (
                                <img
                                    key={i}
                                    src="/src/Image/Banana.png"
                                    alt="Thumbnail"
                                    className="w-16 h-16 sm:w-20 sm:h-20 border rounded-md border-gray-300 object-contain cursor-pointer hover:border-green-500"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PART */}
                    <div className="mt-6 sm:mt-0 px-2 sm:px-4 lg:px-0 max-w-2xl mx-auto space-y-6">
                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            Marketside Fresh Organic Bananas, Bunch
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="ri-star-fill"></i>
                                ))}
                            </div>
                            <button className="border border-gray-300 text-black text-xs sm:text-sm px-2 py-0.5 rounded">
                                3.00
                            </button>
                            <p className="text-gray-500 text-xs sm:text-sm">2</p>
                            <span className="mx-1 text-gray-300">|</span>
                            <p className="text-gray-500 text-xs sm:text-sm">
                                SKU: <span className="text-black font-bold">E7F8G9H0</span>
                            </p>
                        </div>

                        <hr className="border-gray-300" />

                        {/* Description */}
                        <p className="text-sm sm:text-base">
                            Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-red-500 text-xl sm:text-2xl font-bold">₹120</span>
                            <span className="line-through text-gray-400 text-sm sm:text-base">₹150.99</span>
                        </div>

                        {/* Quantity + Buttons */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center border border-gray-300 rounded px-3 py-1">
                                <button>-</button>
                                <span className="px-4">1</span>
                                <button>+</button>
                            </div>

                            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 font-bold rounded flex items-center gap-2 text-sm sm:text-base">
                                <i className="ri-shopping-cart-fill"></i> Add to Cart
                            </button>
                        </div>

                        {/* Info */}
                        <div className="border border-gray-200 rounded-2xl text-black text-sm sm:text-base p-0 max-h-[220px] overflow-y-auto">
                            <div id="accordion-collapse" data-accordion="collapse" data-active-classes="bg-[#251c4b] text-white">
                                {/* Item 1 */}
                                <h2 id="accordion-collapse-heading-1">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium border-b border-gray-200 [aria-expanded='true']:bg-[#251c4b] text-black focus:outline-none"
                                        data-accordion-target="#accordion-collapse-body-1"
                                        aria-expanded="true"
                                        aria-controls="accordion-collapse-body-1"
                                    >
                                        <span>What is Flowbite?</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                                    <div className="p-5 text-gray-600">
                                        <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                </div>
                                {/* Item 2 */}
                                <h2 id="accordion-collapse-heading-2">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium border-b border-gray-200 text-black focus:outline-none"
                                        data-accordion-target="#accordion-collapse-body-2"
                                        aria-expanded="false"
                                        aria-controls="accordion-collapse-body-2"
                                    >
                                        <span>Is there a Figma file available?</span>
                                        <svg data-accordion-icon className="w-3 h-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                                    <div className="p-5 text-gray-600">
                                        <p className="mb-2">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                    </div>
                                </div>
                                {/* Item 3 */}
                                <h2 id="accordion-collapse-heading-3">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full border-b border-gray-200 p-5 font-medium text-black focus:outline-none"
                                        data-accordion-target="#accordion-collapse-body-3"
                                        aria-expanded="false"
                                        aria-controls="accordion-collapse-body-3"
                                    >
                                        <span>What are the differences between Flowbite and Tailwind UI?</span>
                                        <svg data-accordion-icon className="w-3 h-3 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                                    <div className="p-5 text-gray-600">
                                        <p className="mb-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                                    </div>
                                </div>
                                {/* Item 4 */}
                                <h2 id="accordion-collapse-heading-4">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium border-b border-gray-200 text-black focus:outline-none"
                                        data-accordion-target="#accordion-collapse-body-4"
                                        aria-expanded="true"
                                        aria-controls="accordion-collapse-body-4"
                                    >
                                        <span>Shopno?</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-4" className="hidden" aria-labelledby="accordion-collapse-heading-4">
                                    <div className="p-5 text-gray-600">
                                        <p className="mb-2">Helllo shopno</p>
                                    </div>
                                </div>
                                {/* Item 5 */}
                                <h2 id="accordion-collapse-heading-5">
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-5 font-medium  text-black focus:outline-none"
                                        data-accordion-target="#accordion-collapse-body-5"
                                        aria-expanded="true"
                                        aria-controls="accordion-collapse-body-5"
                                    >
                                        <span>Hello React</span>
                                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                        </svg>
                                    </button>
                                </h2>
                                <div id="accordion-collapse-body-5" className="hidden" aria-labelledby="accordion-collapse-heading-5">
                                    <div className="p-5 text-gray-600">
                                        <p className="mb-2">Helllo React js</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Wishlist, Share, Compare */}
                        <div className="flex gap-6 text-sm sm:text-base text-black flex-wrap">
                            <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-heart-line"></i>
                                Add to wishlist
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-share-2-line"></i>
                                Share this Product
                            </div>
                            <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-arrow-left-right-fill"></i>
                                Compare
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-12">
                    <div>
                        {/* Tabs */}
                        <div className="flex gap-6 text-sm sm:text-base font-medium border-b border-gray-200 flex-wrap">
                            <button className="pb-2 border-b-2 border-black text-black">Description</button>
                            <button className="pb-2 text-gray-500 hover:text-black">Reviews (2)</button>
                        </div>

                        {/* Content */}
                        <div className="mt-6 space-y-4 text-black text-sm sm:text-base leading-relaxed">
                            <p>
                                Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
                            </p>
                            <p>
                                Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-16 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Related Products</h2>
                    <div className="w-full p-1 grid grid-cols-2 border rounded-md shadow-md border-gray-200 sm:grid-cols-3 bg-gray-100 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {displayProducts.map((item, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-3 hover:shadow-lg transition border-gray-200 bg-white"
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-[120px] sm:h-[140px] md:h-[150px] object-contain mb-2"
                                />
                                <p className="text-black text-[10px] flex items-center gap-1 bg-gray-100 border rounded-2xl border-gray-100 w-15">
                                    <i className="ri-time-line"></i> {item.time}
                                </p>
                                <h4 className="font-semibold mt-1">{item.name}</h4>
                                <p className="text-gray-600 text-[14px] mt-2">{item.qty}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <h5 className="font-bold text-[13px] mt-8">{item.price}</h5>
                                    <button className="px-3 py-1 mt-8 border bg-green-50 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition text-sm">
                                        ADD
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubDetail;
