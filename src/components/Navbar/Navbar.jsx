import { Flex, Text, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";
import AuthLink from "../AuthLink/AuthLink";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import UserRole from "../UserRole/UserRole";
import { COLORS } from "../../theme";
import { Image } from "@chakra-ui/react";
import imgLogo from "../../assets/logo1.jpg"

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(UserContext);
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
      padding={{ base: "12px", md: "34px 80px", xl: "20px 60px" }}

      alignItems={"center"}
      wrap="wrap"
      bg={COLORS.PRIMARY}
      color="white"
    >
      <Flex align="center" mr={100}>
        <CustomLink to="/">
        <Box
  display="flex"
  justifyContent="center" 
  mt={{ base: 4, md: 0 }}
  alignItems="center"
>
  <Image
    src= {imgLogo}
    alt="Libro de Autopsias"
    boxSize={{ base: "100px", md: "100px", xl: "200px" }} 
    objectFit="cover" 
  />
</Box>
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
          justifyContent={{ base: "center", xl: "space-around" }}
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
                color={isActiveLink ? COLORS.WHITE : "grey"}
                borderRadius="5px"
                padding="2"
                margin="1"

              >
                <Text fontSize={{ base: "sm", md: "md", xl: "lg" }}>
                  {text}
                </Text>
              </NavigationLink>
            );
          })}
        </Flex>
      </Flex>
      <Flex>
        <Box
          display={{ base: isOpen ? "none" : "flex", xl: "flex" }}
          mt={{ base: 4, md: 0 }}
          alignItems="center"
        >
          {user ? (
            <>
              <Box
                display={{ base: "none", xl: "block" }}

                mr={{ xl: 4 }}
              >
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

    </Flex>
  );
};

export default Navbar;
