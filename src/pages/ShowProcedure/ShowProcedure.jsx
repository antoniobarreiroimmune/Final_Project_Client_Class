import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, VStack, Flex, Textarea, Button } from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import LocationComponent from '../../components/LocationComponent/LocationComponent';

function ShowProcedure() {
  const { state } = useLocation();
  const procedure = state?.procedure; 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState(''); 

  const handleEdit = () => {
    navigate(`/editprocedure/${procedure?._id}`, { state: { procedure } });
  };

 
  const handleAddressFetch = (fetchedAddress) => {
    setAddress(fetchedAddress);
  };

  if (!procedure) {
    return <div><h1>Procedimiento no encontrado</h1></div>;
  }

  return (
    <PageWrapper>
      <Box p={4}>
        {procedure?.guardInfo && (
          <Box mt={5}>
            <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
            <Text><strong>Nombre:</strong> {procedure.guardInfo.name}</Text>
            <Text><strong>Primer nombre:</strong> {procedure.guardInfo.firstName}</Text>
            <Text><strong>Apellido:</strong> {procedure.guardInfo.lastName}</Text>
            <Text><strong>Email:</strong> {procedure.guardInfo.email}</Text>
          </Box>
        )}

        <LocationComponent location={procedure.location} onAddressFetch={handleAddressFetch} />

        <VStack align="stretch" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Procedimiento</Text>
          <Flex direction={["column", "column", "row"]} justify="space-between" wrap="wrap">
            <Text mb={[2, 2, 0]}><strong>Nombre:</strong> {procedure.name}</Text>
            <Text mb={[2, 2, 0]}><strong>Primer Apellido:</strong> {procedure.firstName}</Text>
            <Text mb={[2, 2, 0]}><strong>Segundo Apellido:</strong> {procedure.lastName}</Text>
            <Text mb={[2, 2, 0]}><strong>DNI:</strong> {procedure.dni}</Text>
            <Text mb={[2, 2, 0]}><strong>Localiazación:</strong> {address}</Text>
            <Text mb={[2, 2, 0]}><strong>Dirección:</strong> {procedure.address}</Text>
          </Flex>
          <Flex justify="space-between" wrap="wrap">
            <Text mb={2}><strong>Violencia de género:</strong> {procedure.isGenderViolence ? 'Sí' : 'No'}</Text>
            <Text mb={2}><strong>Violencia doméstica:</strong> {procedure.isDomesticViolence ? 'Sí' : 'No'}</Text>
            <Text mb={2}><strong>Órgano judicial:</strong> {procedure.judicialBody}</Text>
          </Flex>
          <Box>
            <Text mb={2}><strong>Informe de procedimiento:</strong></Text>
            <Textarea minHeight="280px" readOnly value={procedure.procedureReport || ''} />
          </Box>
          <Flex justify="space-between" wrap="wrap">
            <Text mb={2}><strong>Fecha de creación:</strong> {new Date(procedure.createdAt).toLocaleDateString()}</Text>
            <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(procedure.updatedAt).toLocaleDateString()}</Text>
            <Text mb={2}><strong>Procedimiento completado:</strong> {procedure.procedureCompleted ? 'Sí' : 'No'}</Text>
          </Flex>
          {user && user._id === procedure.guardInfo?.guardId && !procedure.procedureCompleted && (
            <Button size="sm" onClick={handleEdit}>Editar</Button>
          )}
        </VStack>
      </Box>
    </PageWrapper>
  );
}

export default ShowProcedure;
