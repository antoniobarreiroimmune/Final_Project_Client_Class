import React, {useState, useEffect}from 'react';
import {Flex, Box, Input, Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import Title from '../../components/Title/Title';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../theme';
import FinalReportService from '../../services/finalReport.service';


function FinalReport  ()  {
const [finalReports, setFinalReports] = useState([]);
const [filteredFinalReports, setFilteredFinalReports] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
setIsLoading(true);
FinalReportService.getAllFinalReports()
.then(data => {
setFinalReports(data);
setFilteredFinalReports(data);
setError(null);
})
.catch(err => {
console.error('Error fetching finalReports:', err);
setError('Error fetching finalReports');
})
.finally(() => {
setIsLoading(false);
});
}, []);

useEffect(() => {
const results = finalReports.filter(finalReport =>
finalReport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
finalReport.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
finalReport.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
finalReport.dni.includes(searchTerm) ||
(finalReport.location && finalReport.location.coordinates ? finalReport.location.coordinates.join(", ").includes(searchTerm) : false)

);
setFilteredFinalReports(results);
}, [searchTerm, finalReports]);
const navigate = useNavigate();


const handleRowClick = (finalReport) => {
navigate(`/showFinalReport/${finalReport._id}`, { state: { finalReport } });
};

return (
  <PageWrapper>
    <Flex direction="column" align="center" mt={{ base: '10vh', md: '15vh' }} width="100%">
      <Title>Informe Final</Title>

      <Input
        placeholder="Buscar Informe Final..."
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
                <Th textAlign="center">Número de procedimiento</Th>
                <Th display={{ base: 'none', md: 'table-cell ' }} textAlign="center">DNI</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Ubicación</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia de Género</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Violencia Doméstica</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Órgano Judicial</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Informe Final Completado</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Creado</Th>
                <Th display={{ base: 'none', md: 'table-cell' }} textAlign="center">Actualizado</Th>
              </Tr>
          </Thead>
          <Tbody>
            {filteredFinalReports.map((finalReport, index) => (
              <Tr key={finalReport._id} bg={index % 2 === 0 ? COLORS.TABLEONE : COLORS.TABLETWO} onClick={() => handleRowClick(finalReport)} style={{ cursor: 'pointer' }} sx={{ '&:hover': { backgroundColor: COLORS.ACCENT } }}>
                <Td textAlign="center">{finalReport.name}</Td>
                <Td textAlign="center">{finalReport.firstName}</Td>
                <Td textAlign="center">{finalReport.lastName}</Td>
                <Td textAlign="center">{finalReport.procedureNumber}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.dni}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.location && finalReport.location.coordinates ? finalReport.location.coordinates.join(", ") : 'No disponible'}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.isGenderViolence ? 'Sí' : 'No'}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.isDomesticViolence ? 'Sí' : 'No'}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.judicialBody}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{finalReport.finalReportCompleted ? 'Sí' : 'No'}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(finalReport.createdAt).toLocaleDateString()}</Td>
                <Td display={{ base: 'none', md: 'table-cell' }} textAlign="center">{new Date(finalReport.updatedAt).toLocaleDateString()}</Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  </PageWrapper>
);
}

export default FinalReport;
