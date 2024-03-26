import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import AuthMiddleware from "../middlewares/AuthMiddleware"
import { AuthProvider } from "../contexts/AuthContext"



const Layout = () => {
  return (
    <AuthProvider>
      <AuthMiddleware>
      <Navbar />
      <Outlet />
      <Footer />
      </AuthMiddleware>
   </AuthProvider>
   


  )
}

export default Layout
