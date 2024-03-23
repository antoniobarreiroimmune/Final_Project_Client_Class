import React, { useState } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { FormInput, FormSwitch, FormSelect } from '../../components/FormControls/FormControls';
import proceduresService from "../../services/procedures.service";
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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProcedureData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await proceduresService.createProcedure(procedureData);
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
      console.error(err);
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">

            <Flex direction="row" gap="4">
              <FormInput
                label="Nombre"
                value={procedureData["name"]}
                onChange={onChange}
                name="name"
              />
              <FormInput
                label="Primer Apellido"
                value={procedureData["firstName"]}
                onChange={onChange}
                name="firstName"
              />
              <FormInput
                label="Segundo Apellido"
                value={procedureData["lastName"]}
                onChange={onChange}
                name="lastName"
              />

            </Flex>


            <Flex direction="row" gap="2" align="center">
              <Box flex="1">
                <FormInput
                  label="DNI"
                  value={procedureData["dni"]}
                  onChange={onChange}
                  name="dni"
                />
              </Box>
              <Box flex="1">
                <FormInput
                  label="Localización"
                  value={procedureData["location"]}
                  onChange={onChange}
                  name="location"
                />
              </Box>

              <Box flex="1">
                <FormSelect
                  label="Cuerpo Judicial"
                  value={procedureData["judicialBody"]}
                  onChange={onChange}
                  name="judicialBody"
                  options={JUDICIAL_BODY_OPTIONS}
                />
              </Box>
            </Flex>




            <Flex direction="row" gap="1">
              <Box flex="1">
                <FormSwitch
                  label="Violencia De Género"
                  isChecked={procedureData["violenciaDeGenero"]}
                  onChange={onChange}
                  name="violenciaDeGenero"
                />
              </Box>
              <Box flex="1">
                <FormSwitch
                  label="Violencia Doméstica"
                  isChecked={procedureData["violenciaDomestica"]}
                  onChange={onChange}
                  name="violenciaDomestica"
                />
              </Box>

            </Flex>


            <FormInput
              label="Informe de Procedimiento"
              isTextArea={true}
              value={procedureData["procedureReport"]}
              onChange={onChange}
              name="procedureReport"
              minH="200px"
            />

            <Button type="submit" colorScheme="blue">Crear Procedimiento</Button>
          </Flex>
        </form>
      </Box>
    </PageWrapper>




  );
}

export default CreateProcedurePage;

