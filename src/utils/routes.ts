import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";

export const ROUTES = [
  {
    path: "/",
    index: true,
    element: Home,
  },
  {
    path: "/product",
    index: false,
    element: Product,
  },
  {
    path: "/product/edit",
    index: false,
    element: Product,
  },
];
