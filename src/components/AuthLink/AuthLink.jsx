import { Flex, Text } from '@chakra-ui/layout';
import CustomLink from '../CustomLink/CustomLink';

const AuthLink = ({ children, to }) => {
  return (
    <CustomLink
      borderRadius='30px'
      padding={'10px 20px'}
      backgroundColor={'black'}
      color={'white'}
      to={to}
    >
      <Flex justify={'center'} alignItems={'center'}>
        <Text fontSize={'20px'}>{children}</Text>
      </Flex>
    </CustomLink>
  );
};

export default AuthLink;
