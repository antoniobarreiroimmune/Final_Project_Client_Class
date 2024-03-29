import { Flex, Text } from "@chakra-ui/react"; 
import CustomLink from "../CustomLink/CustomLink";
import { COLORS } from "../../theme";

const AuthLink = ({ onClick, children, to }) => {
  return (
    <CustomLink
      onClick={onClick}
      borderRadius="20px" 
      padding="5px 15px" 
      backgroundColor={COLORS.ACCENT}
      color="white"
      to={to}
    >
      <Flex justify="center" alignItems="center">
        <Text as="span" fontSize="14px"> 
          {children}
        </Text>
      </Flex>
    </CustomLink>
  )
}

export default AuthLink;
