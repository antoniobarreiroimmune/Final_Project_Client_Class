import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, AlertTitle, AlertDescription, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import proceduresService from '../../services/procedures.service';
import { AuthContext } from '../../contexts/AuthContext'; 

function GuardHomePage() {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const loadProcedures = async () => {
      try {
        const loadedProcedures = await proceduresService.getAllProcedures();
        setProcedures(loadedProcedures);
        setFilteredProcedures(loadedProcedures);
        setShowError(false);
        setErrorMessage('');
      } catch (error) {
        console.error('Error loading procedures:', error);
        setShowError(true);
        setErrorMessage('Error al cargar los procedimientos');
      }
    };

    loadProcedures();
  }, [navigate]);

  useEffect(() => {
    const results = procedures.filter(procedure =>
      procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.dni.includes(searchTerm) ||
      procedure.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProcedures(results);
  }, [searchTerm, procedures]);

  const handleEdit = (procedure) => {
    navigate(`/editprocedure/${procedure._id}`, { state: { procedure } });
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
        <Input
          placeholder="Buscar procedimientos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          my="4"
        />
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
              {filteredProcedures.map((procedure, index) => (
                <Tr key={procedure._id} bg={index % 2 === 0 ? 'gray.200' : 'blue.200'}>
                  <Td textAlign="center">{procedure.name}</Td>
                  <Td textAlign="center">{procedure.firstName}</Td>
                  <Td textAlign="center">{procedure.lastName}</Td>
                  <Td textAlign="center">{procedure.dni}</Td>
                  <Td textAlign="center">{procedure.location}</Td>
                  <Td textAlign="center">{procedure.observations}</Td>
                  <Td textAlign="center">{procedure.isGenderViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{procedure.isDomesticViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{procedure.judicialBody}</Td>
                  <Td textAlign="center">{procedure.procedureReport}</Td>
                  <Td textAlign="center">{procedure.procedureCompleted ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{new Date(procedure.createdAt).toLocaleDateString()}</Td>
                  <Td textAlign="center">{new Date(procedure.updatedAt).toLocaleDateString()}</Td>
                  <Td textAlign="center">
                    {user && user.role === 'Guard' && (
                      <Button size="sm" onClick={() => handleEdit(procedure)}>Editar</Button>
                    )}
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

