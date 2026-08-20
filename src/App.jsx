import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/landing-page";
import MemeCategory from "./pages/memecategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">404 - Page Not Found 🕵️</h1>
      </div>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/memecategory", element: <MemeCategory /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}