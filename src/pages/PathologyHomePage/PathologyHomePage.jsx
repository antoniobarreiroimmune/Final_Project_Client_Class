import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Box, Input, Table, Thead, Tbody, Tr, Th, Td, Button
} from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import PathologyService from '../../services/pathology.service';


function PathologyHome() {
  const [pathologies, setPathologies] = useState([]);
  const [filteredPathologies, setFilteredPathologies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      pathology.location.toLowerCase().includes(searchTerm.toLowerCase())
      
    );
    setFilteredPathologies(results);
  }, [searchTerm, pathologies]);
  const navigate = useNavigate();

  

 const handleRowClick = (pathology) => {
    navigate(`/showPathology/${pathology._id}`, { state: { pathology } });
  };

  return (
    <PageWrapper>
      <Flex direction="column" align="center" mt="25vh" width="100%">
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
                <Th textAlign="center">DNI</Th>
                <Th textAlign="center">Ubicación</Th>
                <Th textAlign="center">Observaciones</Th>
                <Th textAlign="center">Violencia de Género</Th>
                <Th textAlign="center">Violencia Doméstica</Th>
                <Th textAlign="center">Órgano Judicial</Th>
                <Th textAlign="center">Informe del Procedimiento</Th>
                <Th textAlign="center">Patología Completado</Th>
                <Th textAlign="center">Creado</Th>
                <Th textAlign="center">Actualizado</Th>
                
              </Tr>
            </Thead>
            <Tbody>
              {filteredPathologies.map((pathology, index) => (
                <Tr key={pathology._id} bg={index % 2 === 0 ? 'gray.200' : 'blue.200'} onClick={()=> handleRowClick(pathology)}style={{cursor:'pointer'}}>
                  <Td textAlign="center">{pathology.name}</Td>
                  <Td textAlign="center">{pathology.firstName}</Td>
                  <Td textAlign="center">{pathology.lastName}</Td>
                  <Td textAlign="center">{pathology.dni}</Td>
                  <Td textAlign="center">{pathology.location}</Td>
                  <Td textAlign="center">{pathology.observations}</Td>
                  <Td textAlign="center">{pathology.isGenderViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{pathology.isDomesticViolence ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{pathology.judicialBody}</Td>
                  <Td textAlign="center">{pathology.procedureReport}</Td>
                  <Td textAlign="center">{pathology.pathologyCompleted ? 'Sí' : 'No'}</Td>
                  <Td textAlign="center">{new Date(pathology.createdAt).toLocaleDateString()}</Td>
                  <Td textAlign="center">{new Date(pathology.updatedAt).toLocaleDateString()}</Td>
                  
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
