import { useLocation } from 'react-router-dom';
import { Box, Text, VStack, HStack, Grid, GridItem, Textarea, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';   
import { useContext } from 'react';



function ShowProcedure() {
    const { state } = useLocation();
    const procedure = state?.procedure;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);



    if (!procedure) {
        return (
            <div>
                <h1>Procedimiento no encontrado</h1>
            </div>
        );

    }

    const handleEdit = (procedure) => {
        navigate(`/editprocedure/${procedure._id}`, { state: { procedure } });
    };

    return (
        <Box maxW="80%" margin="auto" mt={5}>
        <VStack align="stretch" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Procedimiento</Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem colSpan={1}><Text><strong>Nombre:</strong> {procedure.name}</Text></GridItem>
            <GridItem colSpan={1}><Text><strong>Primer nombre:</strong> {procedure.firstName}</Text></GridItem>
            <GridItem colSpan={1}><Text><strong>Apellido:</strong> {procedure.lastName}</Text></GridItem>
            <GridItem colSpan={1}><Text><strong>DNI:</strong> {procedure.dni}</Text></GridItem>
          </Grid>
          <HStack justify="space-between">
            <Text><strong>Ubicación:</strong> {procedure.location}</Text>
            <Text><strong>Observaciones:</strong> {procedure.observations}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text><strong>Violencia de género:</strong> {procedure.isGenderViolence ? 'Sí' : 'No'}</Text>
            <Text><strong>Violencia doméstica:</strong> {procedure.isDomesticViolence ? 'Sí' : 'No'}</Text>
            <Text><strong>Órgano judicial:</strong> {procedure.judicialBody}</Text>
          </HStack>
          <Box>
            <Text mb={2}><strong>Informe de procedimiento:</strong></Text>
            <Textarea minHeight="280px" readOnly value={procedure.procedureReport} />
          </Box>
          <HStack justify="space-between">
            <Text><strong>Fecha de creación:</strong> {new Date(procedure.createdAt).toLocaleDateString()}</Text>
            <Text><strong>Fecha de actualización:</strong> {new Date(procedure.updatedAt).toLocaleDateString()}</Text>
          </HStack>
          <Text><strong>Procedimiento completado:</strong> {procedure.procedureCompleted ? 'Sí' : 'No'}</Text>
          
          
          {user && user.role === 'Guard' && (
            <Button size="sm" onClick={() => handleEdit(procedure)}>Editar</Button>
          )}
        </VStack>
      </Box>
    );
}

export default ShowProcedure;

