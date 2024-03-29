import { useLocation } from "react-router-dom";
import {UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Text, VStack, Button, Textarea, Flex} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LocationComponent from "../../components/LocationComponent/LocationComponent";

function ShowFinalReport() {
    const { state } = useLocation();
    const finalReport = state?.finalReport;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState('');

    if (!finalReport) {
        return (
            <div>
                <h1>Informe Final no encontrado</h1>
            </div>
        );
    }

    const handleEdit = (finalReport) => {
        navigate(`/editFinalReport/${finalReport._id}`, { state: { finalReport } });
    };

    const handleAddressFetch = (fetchedAddress) => {
      setAddress(fetchedAddress);
    };

    return (
        <PageWrapper>
  <Box maxW="80%" margin="auto" > 
    
      <Flex direction={"row"}justify="space-between" wrap="wrap">
        {finalReport?.guardInfo && (
          <Box mt={5}>
            <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
            <Text><strong>Nombre:</strong> {finalReport.guardInfo.name}</Text>
            <Text><strong>Primer nombre:</strong> {finalReport.guardInfo.firstName}</Text>
            <Text><strong>Apellido:</strong> {finalReport.guardInfo.lastName}</Text>
            <Text><strong>Email:</strong> {finalReport.guardInfo.email}</Text>
            </Box>
        )}
      

        {finalReport?.pathologyInfo && (
          <Box mt={5}>
            <Text fontSize="2xl" fontWeight="bold">Patología realizada por:</Text>
            <Text><strong>Nombre:</strong> {finalReport.pathologyInfo.name}</Text>
            <Text><strong>Primer nombre:</strong> {finalReport.pathologyInfo.firstName}</Text>
            <Text><strong>Apellido:</strong> {finalReport.pathologyInfo.lastName}</Text>
            <Text><strong>Email:</strong> {finalReport.pathologyInfo.email}</Text>
          </Box>
        )}
</Flex>
        <LocationComponent location={finalReport.location} onAddressFetch={handleAddressFetch} />

      
   

    <VStack align="stretch" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Informe Final</Text>
            <Flex direction={["column", "column", "row"]} justify="space-between" wrap="wrap">
              <Text mb={[2, 2, 0]}><strong>Nombre:</strong> {finalReport.name}</Text>
              <Text mb={[2, 2, 0]}><strong>Primer nombre:</strong> {finalReport.firstName}</Text>
              <Text mb={[2, 2, 0]}><strong>Apellido:</strong> {finalReport.lastName}</Text>
              <Text mb={[2, 2, 0]}><strong>DNI:</strong> {finalReport.dni}</Text>
              <Text mb={[2, 2, 0]}><strong>Localización:</strong> {address}</Text>
              <Text mb={[2, 2, 0]}><strong>Dirección:</strong> {finalReport.address}</Text>
            </Flex>
           
            <Flex justify="space-between" wrap="wrap">
              <Text mb={2}><strong>Violencia de género:</strong> {finalReport.isGenderViolence ? "Sí" : "No"}</Text>
              <Text mb={2}><strong>Violencia doméstica:</strong> {finalReport.isDomesticViolence ? "Sí" : "No"}</Text>
              <Text mb={2}><strong>Órgano judicial:</strong> {finalReport.judicialBody}</Text>
            </Flex>
            <Box>
              <Text mb={2}><strong>Informe final:</strong></Text>
              <Textarea minHeight="280px" readOnly value={finalReport.finalReportReport || ''} />
            </Box>
            <Flex justify="space-between" wrap="wrap">
              <Text mb={2}><strong>Fecha de creación:</strong> {new Date(finalReport.createdAt).toLocaleDateString()}</Text>
              <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(finalReport.updatedAt).toLocaleDateString()}</Text>
              <Text><strong>Informe Final Completado:</strong> {finalReport.finalReportCompleted ? "Sí" : "No"}</Text>
            </Flex>
            
          
    

      {
        ((user && user._id === finalReport.guardInfo?.guardId) ||
          (user && user._id === finalReport.pathologyInfo?.pathologyId)) &&
        !finalReport.finalReportCompleted && (
          <Button size="sm" onClick={() => handleEdit(finalReport)}>
            Editar
          </Button>
        )
      }

    </VStack>
  </Box>
</PageWrapper>


    );
}

export default ShowFinalReport;
