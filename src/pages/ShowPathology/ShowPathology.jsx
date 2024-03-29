import { useLocation } from "react-router-dom";
import { Box, Text, VStack,Flex, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

function ShowPathology() {
    const { state } = useLocation();
    const pathology = state?.pathology;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);


    if (!pathology) {
        return (
            <div>
                <h1>Patología no encontrada</h1>
            </div>
        );
    }

    const handleEdit = (pathology) => {
        navigate(`/editpathology/${pathology._id}`, { state: { pathology } });
    };

    const showEditButton = (
        user && user.role === "Pathologist" && !pathology.pathologyCompleted && (
            !pathology.pathologyInfo || pathology.pathologyInfo.pathologyId === user._id
        )
    );
    return (
        <PageWrapper>
        <Box maxW="80%" margin="auto" mt={5}>
          {pathology?.guardInfo && (
            <Box mt={5}>
              <Text fontSize="2xl" fontWeight="bold">Procedimiento iniciado por:</Text>
              <Text><strong>Nombre:</strong> {pathology.guardInfo.name}</Text>
              <Text><strong>Primer nombre:</strong> {pathology.guardInfo.firstName}</Text>
              <Text><strong>Apellido:</strong> {pathology.guardInfo.lastName}</Text>
              <Text><strong>Email:</strong> {pathology.guardInfo.email}</Text>
            </Box>
          )}
          <VStack align="stretch" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Patología</Text>
            <Flex direction={["column", "column", "row"]} justify="space-between" wrap="wrap">
              <Text mb={[2, 2, 0]}><strong>Nombre:</strong> {pathology.name}</Text>
              <Text mb={[2, 2, 0]}><strong>Primer nombre:</strong> {pathology.firstName}</Text>
              <Text mb={[2, 2, 0]}><strong>Apellido:</strong> {pathology.lastName}</Text>
              <Text mb={[2, 2, 0]}><strong>DNI:</strong> {pathology.dni}</Text>
            </Flex>
            <Flex direction={["column", "column", "row"]} justify="space-between" wrap="wrap">
              <Text mb={[2, 0]}><strong>Ubicación:</strong> {pathology.location}</Text>
              <Text mb={[2, 0]}><strong>Observaciones:</strong> {pathology.observations}</Text>
            </Flex>
            <Flex justify="space-between" wrap="wrap">
              <Text mb={2}><strong>Violencia de género:</strong> {pathology.isGenderViolence ? "Sí" : "No"}</Text>
              <Text mb={2}><strong>Violencia doméstica:</strong> {pathology.isDomesticViolence ? "Sí" : "No"}</Text>
              <Text mb={2}><strong>Órgano judicial:</strong> {pathology.judicialBody}</Text>
            </Flex>
            <Box>
              <Text mb={2}><strong>Informe de patología:</strong></Text>
              <Textarea minHeight="280px" readOnly value={pathology.pathologyReport || ''} />
            </Box>
            <Flex justify="space-between" wrap="wrap">
              <Text mb={2}><strong>Fecha de creación:</strong> {new Date(pathology.createdAt).toLocaleDateString()}</Text>
              <Text mb={2}><strong>Fecha de actualización:</strong> {new Date(pathology.updatedAt).toLocaleDateString()}</Text>
              <Text><strong>Patología completada:</strong> {pathology.pathologyCompleted ? "Sí" : "No"}</Text>
            </Flex>
            {showEditButton && (
              <Button size="sm" onClick={() => handleEdit(pathology)}>Editar</Button>
            )}
          </VStack>
        </Box>
      </PageWrapper>
      
    );
}

export default ShowPathology;