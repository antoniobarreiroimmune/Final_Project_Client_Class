import { Input as ChakraInput } from "@chakra-ui/react"

const Input = ({ placeholder, onChange, ...props }) => {
  return (
    <ChakraInput
      onChange={onChange}
      minH={"70px"} 
      fontWeight={"medium"} 
      fontSize={"20px"} 
      borderRadius={"15px"} 
      backgroundColor={"#E8F0FE"} 
      boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.1)"} 
      _placeholder={{ color: "#5B6E9D" }} 
      _focus={{ boxShadow: "0px 0px 8px rgba(50, 115, 220, 0.25)" }} 
      placeholder={placeholder}
      {...props}
    />
  )
}

export default Input
