import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import GuardHomePage from "../pages/GuardHomePage/GuardHomePage";
import CreateProcedurePage from "../pages/CreateProcedurePage/CreateProcedurePage";
import EditProcedure from "../pages/EditProcedure/EditProcedure";
import PathologistHomePage from "../pages/PathologistHomePage/PathologistHomePage";
import EditPathology from "../pages/EditPathology/EditPathology";

const AppRoutes = () => {
  const router = createBrowserRouter([
   
    {
      path: "/",
      element: <Layout />, 
      children: [
        {
          index: true,
          element: <GuardHomePage />,
        },
        {
          path: "guardhome",
          element: <GuardHomePage />,
        },
        {
          path: "signup",
          element: <SignupPage />,  
        },
        {
          path: "create",
          element: <CreateProcedurePage />,
        },
        {
          path: "editprocedure/:id",
          element: <EditProcedure />,
        },
        {
          path: "pathology",
          element: <PathologistHomePage />,
        },
        {
          path: "editPathology/:id",
          element: <EditPathology />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
      
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;