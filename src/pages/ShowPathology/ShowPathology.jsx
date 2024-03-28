import { useLocation } from "react-router-dom";
import { Box, Text, VStack, HStack, Grid, GridItem, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

function ShowPathology() {
    const { state } = useLocation();
    const pathology = state?.pathology;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


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
                <Text fontSize="2xl" fontWeight="bold">
                    Patología
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <Text>
                            <strong>Nombre:</strong> {pathology.name}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text>
                            <strong>Primer nombre:</strong> {pathology.firstName}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text>
                            <strong>Apellido:</strong> {pathology.lastName}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text>
                            <strong>DNI:</strong> {pathology.dni}
                        </Text>
                    </GridItem>
                </Grid>
                <HStack justify="space-between">
                    <Text>
                        <strong>Ubicación:</strong> {pathology.location}
                    </Text>
                    <Text>
                        <strong>Observaciones:</strong> {pathology.observations}
                    </Text>
                </HStack>
                <HStack justify="space-between">
                    <Text>
                        <strong>Violencia de género:</strong>{" "}
                        {pathology.isGenderViolence ? "Sí" : "No"}
                    </Text>
                    <Text>
                        <strong>Violencia doméstica:</strong>{" "}
                        {pathology.isDomesticViolence ? "Sí" : "No"}
                    </Text>
                    <Text>
                        <strong>Órgano judicial:</strong> {pathology.judicialBody}
                    </Text>
                </HStack>
                <Box>
                    <Text mb={2}>
                        <strong>Informe de patología:</strong>
                    </Text>
                    <Textarea minHeight="280px" readOnly value={pathology.pathologyReport} />
                </Box>
                <HStack justify="space-between">
                    <Text>
                        <strong>Fecha de creación:</strong>{" "}
                        {new Date(pathology.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                        <strong>Fecha de actualización:</strong>{" "}
                        {new Date(pathology.updatedAt).toLocaleDateString()}
                    </Text>
                </HStack>
                <Text>
                    <strong>Patología completada:</strong>{" "}
                    {pathology.pathologyCompleted ? "Sí" : "No"}
                </Text>

                {showEditButton && (
                    <Button size="sm" onClick={() => handleEdit(pathology)}>
                        Editar
                    </Button>
                )}
            </VStack>
        </Box>
        </PageWrapper>
    );
}

export default ShowPathology;