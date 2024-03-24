import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, VStack, HStack, Grid, GridItem, Textarea, Button } from '@chakra-ui/react';
import { AuthContext } from '../../contexts/AuthContext';
import UserService from '../../services/users.service';

function ShowProcedure() {
  const { state } = useLocation();
  const procedure = state?.procedure;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [guardInfo, setGuardInfo] = useState(null);

  useEffect(() => {
    if (procedure && procedure.guardId) {
      UserService.getUserById(procedure.guardId)
        .then(data => {
          setGuardInfo(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [procedure]);

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
    <Box maxW="80%" margin="auto" mt={5}>
    {guardInfo && (
      <Box mt={5}>
      <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
      <Text><strong>Nombre:</strong> {guardInfo.username}</Text>
      <Text><strong>Email:</strong> {guardInfo.email}</Text>
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
        </HStack>
        <Text><strong>Procedimiento completado:</strong> {procedure.procedureCompleted ? 'Sí' : 'No'}</Text>
        {user && user.role === 'Guard' && (
          <Button size="sm" onClick={handleEdit}>Editar</Button>
        )}


      </VStack>
    </Box>
  );
}

export default ShowProcedure;
