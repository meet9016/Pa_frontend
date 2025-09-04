// import React from "react";

// const Footer = () => {
//   return (
//     <div className="w-full bg-[#251c4b] text-white">
//       <div className="w-full max-w-[1300px] mx-auto px-6 py-10">
//         <div className="flex flex-col md:flex-row md:justify-between gap-8 border-white/20 pb-1">
//           {/* Logo */}
//           <img
//             src="https://pa.2-min.in/upload/web_logo/footer_logo.png"
//             alt="PA Logo"
//             className="w-[150px] md:w-[200px]"
//           />

//           {/* Right side */}
//           <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 w-full">
//             {/* Privacy + Terms */}
//             <div className="flex flex-row gap-6 text-lg font-medium items-center">
//               <span className="cursor-pointer hover:text-gray-200">
//                 Privacy Policy
//               </span>
//               <div className="w-[1px] h-6 bg-white/40"></div>
//               <span className="cursor-pointer hover:text-gray-200">
//                 Terms & Conditions
//               </span>
//             </div>

//             {/* Social Icons */}
//             <div className="flex items-center justify-center gap-4 text-3xl">
//               <i className="ri-instagram-line cursor-pointer hover:scale-110 hover:text-pink-500 transition-transform"></i>
//               <i className="ri-facebook-circle-line cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform"></i>
//               <i className="ri-youtube-line cursor-pointer hover:scale-110 hover:text-red-500 transition-transform"></i>
//               <i className="ri-pinterest-line cursor-pointer hover:scale-110 hover:text-red-700 transition-transform"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom copyright */}
//       <div className="w-full bg-[#ffffff] text-center text-black py-4 text-sm">
//         <p>
//           © {new Date().getFullYear()} Progress Alliance Foundation. All Rights
//           Reserved. | Designed with{" "}
//           <i className="ri-heart-fill text-[16px] text-[#fd317b]"></i> by{" "}
//           <a
//             href="https://shopnoecommerce.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-[#251c4b] hover:text-[#6a5acd] font-medium underline underline-offset-2"
//           >
//             Shopno E-commerce Private Limited
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;












import React from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#251c4b] text-white">
      <div className="w-full max-w-[1300px] mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-8  pb-8">
          {/* Logo */}
          <img
            src="https://superadmin.progressalliance.org/upload/web_logo/footer_logo.png"
            alt="PA Logo"
            className="w-[140px] md:w-[200px]"
          />

          {/* Right side */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-end w-full">
            {/* Privacy + Terms */}
            <div className="flex flex-col gap-3 text-base font-medium items-center md:flex-row md:gap-6">
              <span
                onClick={() => navigate('/privacy-policy')}
                className="cursor-pointer hover:text-gray-200">
                Privacy Policy
              </span>
              <div className="hidden md:block w-[1px] h-6 bg-white/40"></div>
              <span
                onClick={() => navigate('/terms-condition')}
                className="cursor-pointer hover:text-gray-200">
                Terms & Conditions
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-5 text-2xl md:text-3xl">
              <i className="ri-instagram-line cursor-pointer hover:scale-110 hover:text-pink-500 transition-transform"></i>
              <i className="ri-facebook-circle-line cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform"></i>
              <i className="ri-youtube-line cursor-pointer hover:scale-110 hover:text-red-500 transition-transform"></i>
              <i className="ri-pinterest-line cursor-pointer hover:scale-110 hover:text-red-700 transition-transform"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="w-full bg-white text-center text-black py-4 text-xs sm:text-sm">
        <p className="px-4 leading-relaxed">
          © {new Date().getFullYear()} Progress Alliance Foundation. All Rights
          Reserved. | Designed with{" "}
          <i className="ri-heart-fill text-[#fd317b]"></i> by{" "}
          <a
            href="https://shopnoecommerce.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#251c4b] hover:text-[#6a5acd] font-medium underline underline-offset-2"
          >
            Shopno E-commerce Private Limited
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
