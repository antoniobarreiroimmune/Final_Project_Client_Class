import { Grid } from "@chakra-ui/react"
import React from "react"
import RestaurantCard from "../RestaurantCard/RestaurantCard"
import CustomLink from "../CustomLink/CustomLink"

const RestaurantsGrid = ({ restaurants }) => {
  const handleLike = (e) => {
    e.preventDefault()
  }

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={"40px"}
    >
      {restaurants.map(({ name, _id, image }) => {
        return (
          <CustomLink key={_id} to={`/restaurants/${_id}`}>
            <RestaurantCard
              key={_id}
              name={name}
              image={image}
              handleLike={handleLike}
            />
          </CustomLink>
        )
      })}
    </Grid>
  )
}

export default RestaurantsGrid
