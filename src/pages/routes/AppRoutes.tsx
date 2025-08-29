import { Routes, Route } from "react-router";
import Login from "../auth/Login";
import Home from "../home/Home";
import Product from "../product";
import ProductDetails from "../product/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Search from "../search/Search";


function LayoutWithHeader() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/single-product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<LayoutWithHeader />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        <Route path="/product/:categories_id/:sub_category_id" element={<Product />} />

        <Route path="/single-product/:id" element={<ProductDetails />} />
        <Route path="/search/:id" element={<Search />} />
        {/* Public routes */}
        {/* <Route path="/" element={<Login />} /> */}

        {/* Fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
