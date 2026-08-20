import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

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
      { path: "/", element: <Home /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

export default function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}
