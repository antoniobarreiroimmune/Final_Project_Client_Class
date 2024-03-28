import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex,  Switch } from '@chakra-ui/react';
import proceduresService from '../../services/procedures.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { JUDICIAL_BODY_OPTIONS } from '../../consts';
import { FormInput, FormSelect, FormSwitch } from '../../components/FormControls/FormControls';

function EditProcedure() {
  const { id } = useParams();
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

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProcedure(prev => ({
      ...prev,
      [name]: checked
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
        <Flex direction="row" gap="4">
          <FormInput label="Nombre" value={procedure.name || ''} onChange={handleChange} name="name" mb={{ base: '8', sm: '2'}} />
          <FormInput label="Primer Apellido" value={procedure.firstName || ''} onChange={handleChange} name="firstName" />
          <FormInput label="Segundo Apellido" value={procedure.lastName || ''} onChange={handleChange} name="lastName" />
        </Flex>
        <Flex direction="row" gap="2">
          <FormInput label="DNI" value={procedure.dni || ''} onChange={handleChange} name="dni" readOnly />
          <FormInput label="Ubicación" value={procedure.location || ''} onChange={handleChange} name="location" />
          <FormSelect label="Órgano Judicial" value={procedure.judicialBody || ''} onChange={handleChange} name="judicialBody" options={JUDICIAL_BODY_OPTIONS} />
        </Flex>
        <Flex direction="row" gap="1">
          <FormSwitch label="Violencia de Género" isChecked={procedure.isGenderViolence} onChange={handleSwitchChange} name="isGenderViolence" />
          <FormSwitch label="Violencia Doméstica" isChecked={procedure.isDomesticViolence} onChange={handleSwitchChange} name="isDomesticViolence" />
        </Flex>
        <FormInput label="Informe del Procedimiento" isTextArea={true} value={procedure.procedureReport || ''} onChange={handleChange} name="procedureReport" minH="200px" />
        <FormControl display="flex" alignItems="center" mt="4">
          <FormLabel htmlFor="procedureCompleted" mb="0">
            Procedimiento Completado
          </FormLabel>
          <Switch id="procedureCompleted"
            colorScheme={procedure.procedureCompleted ? 'green' : 'red'}
            isChecked={procedure.procedureCompleted}
            onChange={() => setProcedure(prev => ({ ...prev, procedureCompleted: !prev.procedureCompleted }))} />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt="4">Actualizar Procedimiento</Button>
      </Flex>
    </form>
  </Box>
</PageWrapper>
  );
}

export default EditProcedure;













