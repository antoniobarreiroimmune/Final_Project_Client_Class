import { Flex, Text } from '@chakra-ui/layout';
import { useLocation } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';
import AuthLink from '../AuthLink/AuthLink';

const Navbar = () => {
  const NAVIGATION_LINK = [
    {
      link: '/',
      text: 'Home',
    },
    { link: '/restaurants', text: 'Restaurants' },
    { link: '/restaurants/create', text: 'Create' },
  ];

  const location = useLocation();

  return (
    <Flex
      padding={'34px 80px'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <CustomLink to='/'>
        <Text fontSize={'40px'} fontWeight={'700'}>
          Let Him Cook
        </Text>
      </CustomLink>

      <Flex gap={'34px'}>
        {NAVIGATION_LINK.map(({ link, text }) => {
          const isActiveLink = location.pathname === link;
          return (
            <CustomLink
              to={link}
              key={text}
              textDecoration={isActiveLink ? 'underline' : 'none'}
              fontWeight={isActiveLink ? 'bold' : 'normal'}
            >
              <Text>{text}</Text>
            </CustomLink>
          );
        })}
      </Flex>
      <Flex gap={'20px'}>
        <AuthLink to={'/login'}>Login</AuthLink>
        <AuthLink to={'/sigup'}>Signup</AuthLink>
      </Flex>
    </Flex>
  );
};

export default Navbar;
