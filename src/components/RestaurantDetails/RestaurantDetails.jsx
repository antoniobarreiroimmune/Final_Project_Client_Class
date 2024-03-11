import { Box, Flex, Text } from "@chakra-ui/react"
import React from "react"
import PenEditIcon from "../PenEditIcon/PenEditIcon"
// import EditPenIcon from "../EditPenIcon/EditPenIcon"

const RestaurantDetails = ({ onOpen, restaurantDetails }) => {
  return (
    <Flex marginBottom={"80px"} w={"50%"} justify={"center"}>
      <Flex
        position={"relative"}
        gap={"20px"}
        minW={"550px"}
        maxHeight={"800px"}
        padding={"84px 47px"}
        border={"1px solid rgba(0,0,0,0.2)"}
        borderRadius={"20px"}
        flexDir={"column"}
      >
        {restaurantDetails.map(({ name, content }) => {
          return (
            <Box key={name}>
              {name === "Operating hours" ? (
                Object.entries(content).map(([key, val]) => {
                  return (
                    <Text key={key}>
                      <Text as={"span"} fontWeight={"bold"}>
                        {key}:{" "}
                      </Text>
                      {val}
                    </Text>
                  )
                })
              ) : (
                <Text>
                  <Text as={"span"} fontWeight={"bold"}>
                    {name}:{" "}
                  </Text>
                  {content}
                </Text>
              )}
            </Box>
          )
        })}
        <PenEditIcon onClick={onOpen} />
      </Flex>
    </Flex>
  )
}

export default RestaurantDetails
