import { Box } from "@chakra-ui/react"
import React from "react"

const PenEditIcon = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      position={"absolute"}
      top={"25px"}
      right={"25px"}
      cursor={"pointer"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path
          d="M37.9683 12.9067C37.345 13.53 36.74 14.135 36.7217 14.74C36.6667 15.3267 37.29 15.9317 37.8767 16.5C38.7567 17.4167 39.6183 18.2417 39.5817 19.14C39.545 20.0383 38.61 20.9733 37.675 21.89L30.1033 29.48L27.5 26.8767L35.2917 19.1033L33.5317 17.3433L30.9283 19.9283L24.0533 13.0533L31.0933 6.03167C31.8083 5.31667 33 5.31667 33.6783 6.03167L37.9683 10.3217C38.6833 11 38.6833 12.1917 37.9683 12.9067ZM5.5 31.625L23.0267 14.08L29.9017 20.955L12.375 38.5H5.5V31.625Z"
          fill="#0FA958"
        />
      </svg>
    </Box>
  )
}

export default PenEditIcon
