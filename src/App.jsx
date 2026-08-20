import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { SoundProvider } from "./contexts/SoundContext";
import Layout from "./components/Layout";
import RandomMeme from "./pages/RandomMeme";
import MemeCategory from "./pages/MemeCategory";
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
      { path: "/", element: <RandomMeme /> },
      { path: "/memecategory", element: <MemeCategory /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

export default function App() {
  return (
    <SoundProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </SoundProvider>
  );
}

