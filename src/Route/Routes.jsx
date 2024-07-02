import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Registration from "../Component/SignUp/Registration";
import Login from "../Component/Login/Login";
import Home from "../Component/Home";
import MyProfile from "../Component/MyProfile/MyProfile";
import ForgotPassword from "../Component/Login/ForgotPassword";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
            path: '/register',
            element: <Registration/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
          path: '/profile',
          element: <MyProfile/>
        },
        {
          path:'forgot-password',
          element: <ForgotPassword/>
        }
      ]
    },
  ]);