import { Flex, Text } from "@chakra-ui/react"
import React from "react"
import Input from "../Input/Input"
import SubmitButton from "../SubmitButton/SubmitButton"
import { capitalizeText } from "../../utils"

const CustomForm = ({
  title,
  subtitle,
  onChange,
  onSubmit,
  options,
  ...props
}) => {
  return (
    <Flex {...props} minW={"400px"} maxW={"400px"} flexDir={"column"}>
      <Text textAlign={"center"} fontSize={"48px"} fontWeight={"bold"}>
        {title}
      </Text>
      {subtitle && (
        <Text textAlign={"center"} fontSize={"24px"}>
          {subtitle}
        </Text>
      )}
      <form onSubmit={onSubmit} style={{ marginTop: "30px" }}>
        <Flex flexDir={"column"} gap={"30px"}>
          {options.map((option) => {
            return (
              <Input
                type={option === "password" ? "password" : "text"}
                name={option}
                onChange={onChange}
                key={option}
                placeholder={capitalizeText(option)} // CAPITALIZED!!! "name" => "Name"
              />
            )
          })}
        </Flex>
        <SubmitButton />
      </form>
    </Flex>
  )
}

export default CustomForm
