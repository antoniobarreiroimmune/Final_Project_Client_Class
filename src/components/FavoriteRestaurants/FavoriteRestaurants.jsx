import { Flex } from "@chakra-ui/react"
import React from "react"
import Title from "../Title/Title"
import RestaurantsGrid from "../RestaurantsGrid/RestaurantsGrid"

const FavoriteRestaurants = ({ favoriteRestaurants }) => {
  return (
    <Flex flexDir={"column"} gap={"80px"}>
      <Title fontSize="32px">These are your Favorite Restaurants:</Title>
      <RestaurantsGrid restaurants={favoriteRestaurants} />
    </Flex>
  )
}

export default FavoriteRestaurants
