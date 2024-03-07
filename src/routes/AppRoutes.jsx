import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import HomePage from '../pages/HomePage/HomePage';
import RestaunrantsPage from '../pages/RestaunrantsPage/RestaunrantsPage';
import LoaderRestaunrantsPage from '../pages/RestaunrantsPage/LoaderRestaunrantsPage';
import CreateRestaurantPage from '../pages/CreateRestaurantPage/CreateRestaurantPage';

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/restaurants',
          element: <RestaunrantsPage />,
          loader: LoaderRestaunrantsPage
        },
        {
          path: '/restaurants/create',
          element: <CreateRestaurantPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
};

export default AppRoutes;
