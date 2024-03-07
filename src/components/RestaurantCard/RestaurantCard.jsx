import { Flex, GridItem, Text } from "@chakra-ui/react"
import React from "react"
// import LikeIcon from "../LikeIcon/LikeIcon"

const RestaurantCard = ({ image, name, handleLike }) => {
  return (
    <GridItem
      cursor={"pointer"}
      borderRadius={"30px"}
      w={"100%"}
      h={["400px", "500px", "550px"]}
      backgroundImage={image}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      position={"relative"}
    >
      {/* <LikeIcon handleLike={handleLike} /> */}
      <Flex
        width={"100%"}
        position="absolute"
        bottom="45px"
        justify={"center"}
        alignItems={"center"}
      >
        <Flex
          justify={"center"}
          alignItems={"center"}
          padding={"22px 56px"}
          backgroundColor={"white"}
          borderRadius={"30px"}
        >
          <Text fontSize={"20px"} fontWeight={"bold"}>
            {name}
          </Text>
        </Flex>
      </Flex>
    </GridItem>
  )
}

export default RestaurantCard
