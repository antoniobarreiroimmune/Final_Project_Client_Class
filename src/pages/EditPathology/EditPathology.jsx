import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Textarea, Flex, Text } from '@chakra-ui/react';
import pathologyService from '../../services/pathology.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';

function EditPathology() {
  const { id } = useParams();
  console.log("Pathology ID:", id);
  const location = useLocation();
  const navigate = useNavigate();
  const [pathology, setPathology] = useState({
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    location: '',
    observations: '',
    procedureReport: '',
    pathologyCompleted: false, 
    createdAt: '',
    updatedAt: '',
    isGenderViolence: false,
    isDomesticViolence: false,
    judicialBody: ''
  });

  useEffect(() => {
    if (!location.state?.pathology) {
      const loadPathology = async () => {
        try {
          const loadedPathology = await pathologyService.getPathologyById(id);
          setPathology(loadedPathology);
        } catch (error) {
          console.error('Error loading the pathology', error);
          navigate('/PathologistHomePage');
        }
      };
      loadPathology();
    } else {
      setPathology(location.state.pathology);
    }
  }, [id, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPathology(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pathologyService.updatePathology(id, pathology);
      navigate('/PathologistHomePage');
    } catch (error) {
      console.error('Error updating the pathology', error);
    }
  };

  return (
    <PageWrapper>
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Text>{pathology.name || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Primer apellido</FormLabel>
            <Text>{pathology.firstName || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Segundo apellido</FormLabel>
            <Text>{pathology.lastName || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>DNI</FormLabel>
            <Text>{pathology.dni || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Ubicación</FormLabel>
            <Text>{pathology.location || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Observaciones</FormLabel>
            <Text>{pathology.observations || 'N/A'}</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Informe del Procedimiento</FormLabel>
            <Text>{pathology.procedureReport || 'N/A'}</Text>
          </FormControl>
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel mb="0">Informe Patología Completado</FormLabel>
            <Button id="pathologyCompleted" colorScheme={pathology.pathologyCompleted ? 'green' : 'red'} onClick={() => setPathology(prev => ({ ...prev, pathologyCompleted: !prev.pathologyCompleted }))}>
              {pathology.pathologyCompleted ? 'Completado' : 'No Completado'}
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pathologyReport">Informe de Patología</FormLabel>
            <Textarea id="pathologyReport" name="pathologyReport" value={pathology.pathologyReport || ''} onChange={handleChange} />
          </FormControl>
          <Text fontSize="md" fontWeight="semibold">Órgano Judicial: {pathology.judicialBody || 'N/A'}</Text>
          <Text fontSize="md" fontWeight="semibold">Violencia de Género: {pathology.isGenderViolence ? 'Sí' : 'No'}</Text>
          <Text fontSize="md" fontWeight="semibold">Violencia Doméstica: {pathology.isDomesticViolence ? 'Sí' : 'No'}</Text>
  
          <Button type="submit" colorScheme="blue">Actualizar Procedimiento</Button>
        </Flex>
      </form>
    </Box>
  </PageWrapper>
  

  );
}

export default EditPathology;
