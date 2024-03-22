import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Loading from "../components/Loading/Loading"
import { Navigate } from "react-router-dom"

const AuthMiddleware = ({ children }) => {
  const { isLoading, user } = useContext(AuthContext)

  if (isLoading) return <Loading />

  if (!user) return <Navigate to={"/login"} />

  return children
}

export default AuthMiddleware