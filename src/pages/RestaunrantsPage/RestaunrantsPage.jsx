import React from 'react'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import { Flex } from '@chakra-ui/layout'
import Title from '../../components/Title/Title'
import RestaurantsGrid from '../../components/RestaurantsGrid/RestaurantsGrid'
import { useLoaderData } from 'react-router-dom'

function RestaunrantsPage() {

  const restaurants = useLoaderData();

  return (
    <PageWrapper>
      <Flex flexDir={"column"} gap={"80px"}>
        <Title>Available Restaurants:</Title>
        <RestaurantsGrid restaurants={restaurants} />
      </Flex>
    </PageWrapper>
  )
}

export default RestaunrantsPage