import { useLocation } from "react-router-dom";
import {UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Box, Text, VStack, Grid, GridItem, Button, HStack, Textarea, Flex} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ShowFinalReport() {
    const { state } = useLocation();
    const finalReport = state?.finalReport;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

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

    return (
        <PageWrapper>
  <Box maxW="80%" margin="auto" > 
    <Flex direction="row"  justify="space-between">
      
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

    <VStack align="stretch" spacing={4} mt={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Informe Final
      </Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Text><strong>Nombre:</strong> {finalReport.name}</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text><strong>Primer nombre:</strong> {finalReport.firstName}</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text><strong>Apellido:</strong> {finalReport.lastName}</Text>
        </GridItem>
        <GridItem colSpan={1}>
          <Text><strong>DNI:</strong> {finalReport.dni}</Text>
        </GridItem>
      </Grid>
      <HStack justify="space-between">
        <Text><strong>Ubicación:</strong> {finalReport.location}</Text>
        <Text><strong>Observaciones:</strong> {finalReport.observations}</Text>
      </HStack>
      <HStack justify="space-between">
        <Text><strong>Violencia de género:</strong> {finalReport.isGenderViolence ? "Sí" : "No"}</Text>
        <Text><strong>Violencia doméstica:</strong> {finalReport.isDomesticViolence ? "Sí" : "No"}</Text>
        <Text><strong>Órgano judicial:</strong> {finalReport.judicialBody}</Text>
      </HStack>
      <Box>
        <Text mb={2}><strong>Informe final:</strong></Text>
        <Textarea minHeight="280px" readOnly value={finalReport.finalReport} />
      </Box>
      <HStack justify="space-between">
        <Text><strong>Fecha de creación:</strong> {new Date(finalReport.createdAt).toLocaleDateString()}</Text>
        <Text><strong>Fecha de actualización:</strong> {new Date(finalReport.updatedAt).toLocaleDateString()}</Text>
      </HStack>
      <Text><strong>Patología completada:</strong> {finalReport.finalReportCompleted ? "Sí" : "No"}</Text>

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
