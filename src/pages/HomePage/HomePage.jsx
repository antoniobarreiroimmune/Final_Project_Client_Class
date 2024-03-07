import React from 'react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { Flex } from '@chakra-ui/layout';
import FeaturedRestaurants from '../../components/FeaturedRestaurants/FeaturedRestaurants';

function HomePage() {
  return (
    <PageWrapper>
      <Flex>
        <FeaturedRestaurants />
      </Flex>
    </PageWrapper>
  );
}

export default HomePage;
