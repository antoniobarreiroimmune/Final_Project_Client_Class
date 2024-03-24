import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Textarea, Flex, Text, Switch } from "@chakra-ui/react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Title from "../../components/Title/Title";
import FinalReportService from "../../services/finalReport.service";

function FinalReport() {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        FinalReportService.getAllFinalReports()
            .then(data => {
                setReports(data);
                setFilteredReports(data);
                setError(null);
            })
            .catch(err => {
                console.error('Error fetching reports:', err);
                setError('Error fetching reports');
            })
            .finally(() => {
                setIsLoading(false);
            });


    },[]);
 

useEffect(() => {
    const results = reports.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.dni.includes(searchTerm) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(results);
}, [searchTerm, reports]);
const navigate = useNavigate();

const handleRowClick = (report) => {
    navigate(`/showFinalReport/${report._id}`, { state: { report } });
};

return(
    <PageWrapper>
    <Flex direction="column" align="center" mt="25vh" width="100%">
      <Title>Informe Final</Title>
     
      <Input
        placeholder="Buscar informes finales..."
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
              <Th textAlign="center">Informe de Patología</Th>
              <Th textAlign="center">Creado</Th>
              <Th textAlign="center">Actualizado</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {filteredPathologies.map((pathology, index) => (
              <Tr key={pathology._id} bg={index % 2 === 0 ? 'gray.200' : 'blue.200'} onClick={()=> handleRowClick(report)}style={{cursor:'pointer'}}>
                <Td textAlign="center">{report.name}</Td>
                <Td textAlign="center">{report.firstName}</Td>
                <Td textAlign="center">{report.lastName}</Td>
                <Td textAlign="center">{report.dni}</Td>
                <Td textAlign="center">{report.location}</Td>
                <Td textAlign="center">{report.observations}</Td>
                <Td textAlign="center">{report.isGenderViolence ? 'Sí' : 'No'}</Td>
                <Td textAlign="center">{report.isDomesticViolence ? 'Sí' : 'No'}</Td>
                <Td textAlign="center">{report.judicialBody}</Td>
                <Td textAlign="center">{report.procedureReport}</Td>
                <Td textAlign="center">{report.pathologyCompleted ? 'Sí' : 'No'}</Td>
                <Td textAlign="center">{new Date(report.createdAt).toLocaleDateString()}</Td>
                <Td textAlign="center">{new Date(report.updatedAt).toLocaleDateString()}</Td>
                
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
