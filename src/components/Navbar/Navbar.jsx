import { Flex, Text } from "@chakra-ui/layout"
import { useLocation } from "react-router-dom"
import CustomLink from "../CustomLink/CustomLink"
import AuthLink from "../AuthLink/AuthLink"
import NavigationLink from "../NavigationLink/NavigationLink"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()

  
  let NAVIGATION_LINK = [
    { link: "/", text: "Inicio" },
    { link: "/create", text: "Nuevo Procedimiento" },
  ]

 
  if (user?.role === "Guard") {
    NAVIGATION_LINK = [...NAVIGATION_LINK, { link: "/guardhome", text: "Procedimientos" }]
  } else if (user?.role === "Pathologist") {
    NAVIGATION_LINK = [{ link: "/pathology", text: "Patologías" }, {link:"/guardhome", text:"Procedimientos"}]
  }

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
