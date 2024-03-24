import React, { useState, useEffect } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { FormInput, FormSwitch, FormSelect } from '../../components/FormControls/FormControls';
import proceduresService from "../../services/procedures.service";
import authService from "../../services/auth.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { JUDICIAL_BODY_OPTIONS } from '../../consts';

function CreateProcedurePage() {
  const [procedureData, setProcedureData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    dni: "",
    location: "",
    observations: "",
    isGenderViolence: false,
    isDomesticViolence: false,
    judicialBody: '',
    procedureReport: "",
  });
  const [guardId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getUser(token);
          setUserId(user._id); 
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProcedureData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const procedureDataWithUserId = {
      ...procedureData,
      guardId, 
    };
    try {
      await proceduresService.createProcedure(procedureDataWithUserId);
      setProcedureData({
        name: "",
        firstName: "",
        lastName: "",
        dni: "",
        location: "",
        observations: "",
        isGenderViolence: false,
        isDomesticViolence: false,
        judicialBody: '',
        procedureReport: "",
      }); 
    } catch (err) {
      console.error('Error creating procedure:', err);
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <Flex direction="row" gap="4">
              <FormInput label="Nombre" value={procedureData.name} onChange={onChange} name="name" />
              <FormInput label="Primer Apellido" value={procedureData.firstName} onChange={onChange} name="firstName" />
              <FormInput label="Segundo Apellido" value={procedureData.lastName} onChange={onChange} name="lastName" />
            </Flex>
            <Flex direction="row" gap="2">
              <FormInput label="DNI" value={procedureData.dni} onChange={onChange} name="dni" />
              <FormInput label="Localización" value={procedureData.location} onChange={onChange} name="location" />
              <FormSelect label="Cuerpo Judicial" value={procedureData.judicialBody} onChange={onChange} name="judicialBody" options={JUDICIAL_BODY_OPTIONS} />
            </Flex>
            <Flex direction="row" gap="1">
              <FormSwitch label="Violencia De Género" isChecked={procedureData.isGenderViolence} onChange={onChange} name="isGenderViolence" />
              <FormSwitch label="Violencia Doméstica" isChecked={procedureData.isDomesticViolence} onChange={onChange} name="isDomesticViolence" />
            </Flex>
            <FormInput label="Informe de Procedimiento" isTextArea={true} value={procedureData.procedureReport} onChange={onChange} name="procedureReport" minH="200px" />
            <Button type="submit" colorScheme="blue">Crear Procedimiento</Button>
          </Flex>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default CreateProcedurePage;
