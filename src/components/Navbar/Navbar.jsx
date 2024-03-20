import { Flex, Text } from "@chakra-ui/layout"
import { useLocation } from "react-router-dom"
import CustomLink from "../CustomLink/CustomLink"
import AuthLink from "../AuthLink/AuthLink"
import NavigationLink from "../NavigationLink/NavigationLink"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const NAVIGATION_LINK = [
    {
      link: "/",
      text: "Home",
    },
    { link: "/guardhome", text: "Procedimientos" },
    { link: "/create", text: "Nuevo Procedimiento" },
    
  ]

  const location = useLocation()

  return (
    <Flex
      padding={"34px 80px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <CustomLink to="/">
        <Text fontSize={"40px"} fontWeight={"700"}>
          Libro de Autopsias
        </Text>
      </CustomLink>

      <Flex gap={"34px"}>
        {NAVIGATION_LINK.map(({ link, text }) => {
          const isActiveLink = location.pathname === link
          return (
            <NavigationLink
              to={link}
              key={text}
              textDecoration={isActiveLink ? "underline" : "none"}
              fontWeight={isActiveLink ? "bold" : "normal"}
            >
              <Text>{text}</Text>
            </NavigationLink>
          )
        })}
      </Flex>
      <Flex gap={"20px"}>
        {user ? (
          <>
            <AuthLink to={"/profile"}>Profile</AuthLink>
            <AuthLink onClick={logout}>Logout</AuthLink>
          </>
        ) : (
          <>
            <AuthLink to={"/login"}>Login</AuthLink>
            <AuthLink to={"/signup"}>Signup</AuthLink>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
