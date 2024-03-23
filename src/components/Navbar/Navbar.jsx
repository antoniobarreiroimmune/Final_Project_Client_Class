import { Flex, Text } from "@chakra-ui/layout"
import { useLocation } from "react-router-dom"
import CustomLink from "../CustomLink/CustomLink"
import AuthLink from "../AuthLink/AuthLink"
import NavigationLink from "../NavigationLink/NavigationLink"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import UserRole from "../UserRole/UserRole"
import {COLORS} from "../../theme"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()


  let NAVIGATION_LINK = [
    { link: "/guardhome", text: "Procedimientos" },
    { link: "/pathology", text: "Patologías" }
  ]


  if (user?.role === "Guard") {
    NAVIGATION_LINK = [{ link: "/create", text: "Nuevo Procedimiento" }, ...NAVIGATION_LINK]
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
              backgroundColor={isActiveLink ? COLORS.ACCENT : "transparent"}
              color={isActiveLink ? COLORS.WHITE : "black"}
              borderRadius={"5px"}
            >
              <Text>{text}</Text>
            </NavigationLink>
          )
        })}
      </Flex>
      <Flex gap={"20px"}>
        {(
          <>
            <Text>{user.email}</Text>
            <Text><UserRole role={user.role} /></Text>
          </>
        )}
      </Flex>
      <Flex gap={"20px"}>
        {user ? (
          <>

            <AuthLink onClick={logout}>Logout</AuthLink>
          </>
        ) : (
          <>
            <AuthLink to={"/login"}>Login</AuthLink>

          </>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
