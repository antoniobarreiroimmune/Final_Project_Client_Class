import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Table, Thead, Tbody, Tr, Th, Td, Box, Input } from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import proceduresService from '../../services/procedures.service';
import { COLORS } from '../../theme';

function GuardHomePage() {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProcedures = async () => {
      try {
        const loadedProcedures = await proceduresService.getAllProcedures();
        setProcedures(loadedProcedures);
        setFilteredProcedures(loadedProcedures);
      } catch (error) {
        console.error('Error loading procedures:', error);
      }
    };

    loadProcedures();
  }, [navigate]);

  useEffect(() => {
    const results = procedures.filter(procedure =>
      procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure._id.includes(searchTerm) ||
      procedure.dni.includes(searchTerm) ||
      (procedure.location && procedure.location.coordinates ? procedure.location.coordinates.join(", ").includes(searchTerm) : false)
    );
    setFilteredProcedures(results);
  }, [searchTerm, procedures]);

  const handleRowClick = (procedure) => {
    navigate(`/showprocedure/${procedure._id}`, { state: { procedure } });
  };

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt={{ base: '10vh', md: '15vh' }} width="100%">
        <Title>Procedimientos</Title>
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
                <Th textAlign="center">Número procedimiento</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">DNI</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Ubicación</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia de Género</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia Doméstica</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Órgano Judicial</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Procedimiento Completado</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Creado</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Actualizado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProcedures.map((procedure, index) => (
                <Tr key={procedure._id}
                    bg={index % 2 === 0 ? COLORS.TABLEONE : COLORS.TABLETWO}
                    onClick={() => handleRowClick(procedure)}
                    style={{ cursor: 'pointer' }}
                    sx={{
                      '&:hover': {
                        backgroundColor: COLORS.ACCENT,
                      }
                    }}>
                  <Td textAlign="center">{procedure.name}</Td>
                  <Td textAlign="center">{procedure.firstName}</Td>
                  <Td textAlign="center">{procedure.lastName}</Td>
                  <Td textAlign="center">{procedure.procedureNumber}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.dni}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.location && procedure.location.coordinates ? procedure.location.coordinates.join(", ") : 'No disponible'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.isGenderViolence ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.isDomesticViolence ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.judicialBody}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{procedure.procedureCompleted ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(procedure.createdAt).toLocaleDateString()}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(procedure.updatedAt).toLocaleDateString()}</Td>
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
