import { FC, lazy } from "react";

const Home = lazy<FC>(() => import("../pages/Home/Home"));
const Product = lazy<FC>(() => import("../pages/Product/Product"));

export const ROUTES = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/product/edit",
    component: Product,
  },
];
