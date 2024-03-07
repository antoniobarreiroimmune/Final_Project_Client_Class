import { Text } from "@chakra-ui/react"
import React from "react"

const Title = ({ children, ...props }) => {
  return (
    <Text textAlign={"center"} fontSize={"56px"} fontWeight={"bold"} {...props}>
      {children}
    </Text>
  )
}

export default Title
