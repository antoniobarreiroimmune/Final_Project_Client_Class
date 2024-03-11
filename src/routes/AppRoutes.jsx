import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "../layouts/Layout"
import HomePage from "../pages/HomePage/HomePage"
import RestaunrantsPage from "../pages/RestaunrantsPage/RestaunrantsPage"
import LoaderRestaunrantsPage from "../pages/RestaunrantsPage/LoaderRestaunrantsPage"
import CreateRestaurantPage from "../pages/CreateRestaurantPage/CreateRestaurantPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage/RestaurantDetailsPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"
import AuthMiddleware from "../middlewares/AuthMiddleware"

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/profile",
          element: (
            <AuthMiddleware>
              <ProfilePage />
            </AuthMiddleware>
          ),
        },
        {
          path: "/restaurants",
          element: <RestaunrantsPage />,
          loader: LoaderRestaunrantsPage,
        },
        {
          path: "/restaurants/:id",
          element: <RestaurantDetailsPage />,
        },
        {
          path: "/restaurants/create",
          element: <CreateRestaurantPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default AppRoutes
