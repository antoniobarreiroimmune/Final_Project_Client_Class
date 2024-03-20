import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import Title from '../../components/Title/Title';
import proceduresService from '../../services/procedures.service';

function GuardHomePage() {
  const [procedures, setProcedures] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProcedures = async () => {
      try {
        const loadedProcedures = await proceduresService.getAllProcedures();
        setProcedures(loadedProcedures);
        setShowError(false);
        setErrorMessage('');
      } catch (error) {
        console.error('Error loading procedures:', error);
        if (error.response) {
          switch (error.response.status) {
            case 401:
              navigate('/login');
              break;
            case 403:
              setShowError(true);
              setErrorMessage('Proceso no autorizado');
              break;
            default:
              setShowError(true);
              setErrorMessage('Ha ocurrido un error');
              break;
          }
        } else {
          
          setShowError(true);
          setErrorMessage('Error de conexión');
        }
      }
    };

    loadProcedures();
  }, [navigate]);

  const handleEdit = (procedure) => {
    navigate(`/edit/${procedure._id}`, { state: { procedure } });
  };

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt="25vh" width="100%"> 
        <Title>Procedimientos</Title>
        {showError && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Box width="100%" overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th textAlign="center">Nombre</Th>
                <Th textAlign="center">Primer apellido</Th>
                <Th textAlign="center">Segundo apellido</Th>
                <Th textAlign="center">DNI</Th>
                <Th textAlign="center">Ubicación</Th>
                <Th textAlign="center">Observaciones</Th>
                <Th textAlign="center">Violencia de Género</Th>
                <Th textAlign="center">Violencia Doméstica</Th>
                <Th textAlign="center">Órgano Judicial</Th>
                <Th textAlign="center">Informe del Procedimiento</Th>
                <Th textAlign="center">Procedimiento Completado</Th>
                <Th textAlign="center">Creado</Th>
                <Th textAlign="center">Actualizado</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {procedures.map((procedure, index) => (
                <Tr key={procedure._id} bg={index % 2 === 0 ? 'gray.200' : 'blue.200'}>
                  <Td textAlign="center" px={1}>{procedure.name}</Td>
                  <Td textAlign="center" px={1}>{procedure.firstName}</Td>
                  <Td textAlign="center" px={1}>{procedure.lastName}</Td>
                  <Td textAlign="center" px={1}>{procedure.dni}</Td>
                  <Td textAlign="center" px={1}>{procedure.location}</Td>
                  <Td textAlign="center" px={1}>{procedure.observations}</Td>
                  <Td textAlign="center" px={1}>{procedure.isGenderViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center" px={1}>{procedure.isDomesticViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center" px={1}>{procedure.judicialBody}</Td>
                  <Td textAlign="center" px={1}>{procedure.procedureReport}</Td>
                  <Td textAlign="center" px={1}>{procedure.procedureCompleted ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center" px={1}>{new Date(procedure.createdAt).toLocaleDateString()}</Td>
                  <Td textAlign="center" px={1}>{new Date(procedure.updatedAt).toLocaleDateString()}</Td>
                  <Td textAlign="center" px={1}>
                    <Button size="sm" onClick={() => handleEdit(procedure)}>Editar</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </PageWrapper>
  );
}

export default GuardHomePage;
