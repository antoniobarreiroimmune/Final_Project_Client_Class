import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Flex, Text } from '@chakra-ui/react';
import proceduresService from '../../services/procedures.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

function EditProcedure() {
  const { id } = useParams();
  console.log("Procedure ID:", id);
  const location = useLocation();
  const navigate = useNavigate();
  const [procedure, setProcedure] = useState({
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    location: '',
    observations: '',
    procedureReport: '',
    procedureCompleted: false,
    createdAt: '',
    updatedAt: '',
    //no editables
    isGenderViolence: false,
    isDomesticViolence: false,
    judicialBody: ''
  });

  useEffect(() => {
    if (!location.state?.procedure) {
      const loadProcedure = async () => {
        try {
          const loadedProcedure = await proceduresService.getProcedureById(id);
          setProcedure(loadedProcedure);
        } catch (error) {
          console.error('Error loading the procedure', error);
          navigate('/guardhome');
        }
      };
      loadProcedure();
    } else {
      setProcedure(location.state.procedure);
    }
  }, [id, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcedure(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await proceduresService.updateProcedure(id, procedure);
      navigate('/guardhome');
    } catch (error) {
      console.error('Error updating the procedure', error);
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <FormControl>
              <FormLabel htmlFor="name">Nombre</FormLabel>
              <Input id="name" name="name" value={procedure.name || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="firstName">Primer apellido</FormLabel>
              <Input id="firstName" name="firstName" value={procedure.firstName || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName">Segundo apellido</FormLabel>
              <Input id="lastName" name="lastName" value={procedure.lastName || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="dni">DNI</FormLabel>
              <Input id="dni" name="dni" value={procedure.dni || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Ubicación</FormLabel>
              <Input id="location" name="location" value={procedure.location || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="observations">Observaciones</FormLabel>
              <Textarea id="observations" name="observations" value={procedure.observations || ''} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="procedureReport">Informe del Procedimiento</FormLabel>
              <Textarea id="procedureReport" name="procedureReport" value={procedure.procedureReport || ''} onChange={handleChange} />
            </FormControl>
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor="procedureCompleted" mb="0">
                Procedimiento Completado
              </FormLabel>
              <Button id="procedureCompleted" colorScheme={procedure.procedureCompleted ? 'green' : 'red'} onClick={() => setProcedure(prev => ({ ...prev, procedureCompleted: !prev.procedureCompleted }))}>
                {procedure.procedureCompleted ? 'Completado' : 'No Completado'}
              </Button>
            </FormControl>

            <Text fontSize="md" fontWeight="semibold">Órgano Judicial: {procedure.judicialBody || 'N/A'}</Text>
            <Text fontSize="md" fontWeight="semibold">Violencia de Género: {procedure.isGenderViolence ? 'Sí' : 'No'}</Text>
            <Text fontSize="md" fontWeight="semibold">Violencia Doméstica: {procedure.isDomesticViolence ? 'Sí' : 'No'}</Text>

            <Button type="submit" colorScheme="blue">Actualizar Procedimiento</Button>
          </Flex>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default EditProcedure;