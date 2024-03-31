import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Box, Input, Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PathologyService from '../../services/pathology.service';
import { COLORS } from '../../theme';


function PathologyHome() {
  const [pathologies, setPathologies] = useState([]);
  const [filteredPathologies, setFilteredPathologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    PathologyService.getAllPathologies()
      .then(data => {
        setPathologies(data);
        setFilteredPathologies(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching pathologies:', err);
        setError('Error fetching pathologies');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = pathologies.filter(pathology =>
      pathology.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathology.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathology.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pathology.dni.includes(searchTerm) ||
      (pathology.location && pathology.location.coordinates ? pathology.location.coordinates.join(", ").includes(searchTerm) : false)
    );
    setFilteredPathologies(results);
  }, [searchTerm, pathologies]);

  const navigate = useNavigate();



  const handleRowClick = (pathology) => {
    navigate(`/showPathology/${pathology._id}`, { state: { pathology } });
  };

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt={{ base: '10vh', md: '15vh' }} width="100%">
        <Title>Patología</Title>

        <Input
          placeholder="Buscar procedimientos de patología..."
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
                <Th display={{ base: 'none', md: 'table-cell ' }} textAlign="center">DNI</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Ubicación</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia de Género</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia Doméstica</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Órgano Judicial</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Patología Completada</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Creado</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Actualizado</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredPathologies.map((pathology, index) => (
                <Tr key={pathology._id} bg={index % 2 === 0 ? COLORS.TABLEONE : COLORS.TABLETWO} onClick={() => handleRowClick(pathology)} style={{ cursor: 'pointer' }} sx={{ '&:hover': { backgroundColor: COLORS.ACCENT } }}>
                  <Td textAlign="center">{pathology.name}</Td>
                  <Td textAlign="center">{pathology.firstName}</Td>
                  <Td textAlign="center">{pathology.lastName}</Td>
                  <Td textAlign="center">{pathology.procedureNumber}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.dni}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.location && pathology.location.coordinates ? pathology.location.coordinates.join(", ") : 'No disponible'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.isGenderViolence ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.isDomesticViolence ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.judicialBody}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{pathology.pathologyCompleted ? 'Sí' : 'No'}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(pathology.createdAt).toLocaleDateString()}</Td>
                  <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(pathology.updatedAt).toLocaleDateString()}</Td>

                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </PageWrapper>
  );
}

export default PathologyHome;
