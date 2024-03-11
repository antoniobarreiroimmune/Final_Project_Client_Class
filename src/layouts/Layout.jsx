import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { AuthProvider } from "../contexts/AuthContext"

const Layout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
  )
}

export default Layout
