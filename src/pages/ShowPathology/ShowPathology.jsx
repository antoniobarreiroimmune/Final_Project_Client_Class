import { useLocation } from "react-router-dom";
import { Box, Text, VStack,Flex, Textarea, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {UserContext } from "../../contexts/UserContext";
import { useContext, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import LocationComponent from "../../components/LocationComponent/LocationComponent";


function ShowPathology() {
    const { state } = useLocation();
    const pathology = state?.pathology;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState('');


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

    const handleAddressFetch = (fetchedAddress) => {
      setAddress(fetchedAddress);
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

          <LocationComponent location={pathology.location} onAddressFetch={handleAddressFetch} />

          <VStack align="stretch" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Patología</Text>
            <Flex direction={["column", "column", "row"]} justify="space-between" wrap="wrap">
              <Text mb={[2, 2, 0]}><strong>Nombre:</strong> {pathology.name}</Text>
              <Text mb={[2, 2, 0]}><strong>Primer nombre:</strong> {pathology.firstName}</Text>
              <Text mb={[2, 2, 0]}><strong>Apellido:</strong> {pathology.lastName}</Text>
              <Text mb={[2, 2, 0]}><strong>DNI:</strong> {pathology.dni}</Text>
              <Text mb={[2, 2, 0]}><strong>Localización:</strong> {address}</Text>
              <Text mb={[2, 2, 0]}><strong>Dirección:</strong> {pathology.address}</Text>
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