import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, VStack, HStack, Grid, GridItem, Textarea, Button } from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

function ShowProcedure() {
  const { state } = useLocation();
  const procedure = state?.procedure;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleEdit = () => {
    navigate(`/editprocedure/${procedure?._id}`, { state: { procedure } });
  };

  if (!procedure) {
    return (
      <div>
        <h1>Procedimiento no encontrado</h1>
      </div>
    );
  }

  return (
    <PageWrapper>
    <Box maxW="80%" margin="auto" >
      {procedure?.guardInfo && (
        <Box mt={5}>
          <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
          <Text><strong>Nombre:</strong> {procedure.guardInfo.name}</Text>
          <Text><strong>Primer nombre:</strong> {procedure.guardInfo.firstName}</Text>
          <Text><strong>Apellido:</strong> {procedure.guardInfo.lastName}</Text>
          <Text><strong>Email:</strong> {procedure.guardInfo.email}</Text>
        </Box>
      )}

      <VStack align="stretch" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Procedimiento</Text>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={1}><Text><strong>Nombre:</strong> {procedure.name}</Text></GridItem>
          <GridItem colSpan={1}><Text><strong>Primer nombre:</strong> {procedure.firstName}</Text></GridItem>
          <GridItem colSpan={1}><Text><strong>Apellido:</strong> {procedure.lastName}</Text></GridItem>
          <GridItem colSpan={1}><Text><strong>DNI:</strong> {procedure.dni}</Text></GridItem>
        </Grid>
        <HStack justify="space-between">
          <Text><strong>Ubicación:</strong> {procedure.location}</Text>
          <Text><strong>Observaciones:</strong> {procedure.observations}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text><strong>Violencia de género:</strong> {procedure.isGenderViolence ? 'Sí' : 'No'}</Text>
          <Text><strong>Violencia doméstica:</strong> {procedure.isDomesticViolence ? 'Sí' : 'No'}</Text>
          <Text><strong>Órgano judicial:</strong> {procedure.judicialBody}</Text>
        </HStack>
        <Box>
          <Text mb={2}><strong>Informe de procedimiento:</strong></Text>
          <Textarea minHeight="280px" readOnly value={procedure.procedureReport || ''} />
        </Box>
        <HStack justify="space-between">
          <Text><strong>Fecha de creación:</strong> {new Date(procedure.createdAt).toLocaleDateString()}</Text>
          <Text><strong>Fecha de actualización:</strong> {new Date(procedure.updatedAt).toLocaleDateString()}</Text>
          <Text><strong>Procedimiento completado:</strong> {procedure.procedureCompleted ? 'Sí' : 'No'}</Text>
        </HStack>
        {user && user.role === 'Guard' && !procedure.procedureCompleted && (
  <Button size="sm" onClick={handleEdit}>Editar</Button>
)}
      </VStack>
    </Box>
    </PageWrapper>
  );
}

export default ShowProcedure;
