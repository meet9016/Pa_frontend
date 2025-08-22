import { Routes, Route } from "react-router";
import Login from "../auth/Login";
import Home from "../home/Home";
import Product from "../product";
import ProductDetails from "../product/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected routes */}
      {/* <Route element={<ProtectedRoute />}> */}

        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/single-product" element={<ProductDetails />} />
      {/* </Route> */}
      {/* </Route> */}

      {/* Public routes */}
      <Route path="/" element={<Login />} />

      {/* Fallback */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
