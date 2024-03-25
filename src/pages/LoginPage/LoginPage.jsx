import React from 'react';
import { Flex } from '@chakra-ui/react';
import FormFront from '../../components/FormFront/FormFront';
import { AuthProvider } from '../../contexts/AuthContext';

const LoginPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="100vh"
    >
      <AuthProvider> 
      <FormFront />
      </AuthProvider>
    </Flex>
  );
};

export default LoginPage;