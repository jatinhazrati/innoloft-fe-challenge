import { FC, lazy } from "react";

const Home = lazy<FC>(() => import("../pages/Home/Home"));
const Product = lazy<FC>(() => import("../pages/Product/Product"));

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
