import { Flex, Text, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import AuthLink from "../AuthLink/AuthLink";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import UserRole from "../UserRole/UserRole";
import { COLORS } from "../../theme";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  let NAVIGATION_LINK = [
    { link: "/guardhome", text: "Procedimientos" },
    { link: "/pathology", text: "Patología" },
    { link: "/finalreport", text: "Informe Final" }
  ];

  if (user?.role === "Guard") {
    NAVIGATION_LINK = [{ link: "/create", text: "Nuevo Procedimiento" }, ...NAVIGATION_LINK];
  }

  return (
    <Flex
      as="nav"
      padding={{ base: "12px", md: "34px 80px", xl: "34px 120px" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      wrap="wrap"
      bg={COLORS.PRIMARY}
      color="white"
    >
      <Flex align="center" mr={5}>
        <CustomLink to="/">
          <Text fontSize={{ base: "24px", md: "40px", xl: "48px" }}>
            Libro de Autopsias
          </Text>
        </CustomLink>
      </Flex>

      <Box display={{ base: "block", xl: "none" }} onClick={onToggle}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Toggle Navigation"
        />
      </Box>

      
      <Flex
        display={{ base: isOpen ? "block" : "none", xl: "flex" }} 
        width={{ base: "full", xl: "auto" }}
        flexGrow={1}
        alignItems="center"
      >
        <Flex
          direction={{ base: "column", xl: "row" }} 
          justifyContent={{ base: "center", xl: "space-between" }} 
          width="100%"
        >
          {NAVIGATION_LINK.map(({ link, text }) => {
            const isActiveLink = location.pathname === link;
            return (
              <NavigationLink
                to={link}
                key={text}
                textDecoration={isActiveLink ? "underline" : "none"}
                fontWeight={isActiveLink ? "bold" : "normal"}
                backgroundColor={isActiveLink ? COLORS.ACCENT : "transparent"}
                color={isActiveLink ? COLORS.WHITE : "black"}
                borderRadius="5px"
                padding="8px"
                m="2"
              >
                <Text fontSize={{ base: "sm", md: "md", xl: "lg" }}>
                  {text}
                </Text>
              </NavigationLink>
            );
          })}
        </Flex>
      </Flex>

      <Box
        display={{ base: isOpen ? "none" : "flex", xl: "flex" }}
        mt={{ base: 4, md: 0 }}
        alignItems="center"
      >
        {user ? (
          <>
            <Box display={{ base: "none", xl: "block" }}>
              <Text>{user.email}</Text>
              <UserRole role={user.role} />
            </Box>
            <AuthLink onClick={logout}>Logout</AuthLink>
          </>
        ) : (
          <AuthLink to={"/login"}>Login</AuthLink>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
