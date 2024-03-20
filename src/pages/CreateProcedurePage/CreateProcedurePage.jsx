import React, { useState } from "react";
import FormPageLayout from "../../components/FormPageLayout/FormPageLayout";
import { Flex, Text, Box, VStack } from "@chakra-ui/react";
import Input from "../../components/Input/Input";
import proceduresService from "../../services/procedures.service";
import { JUDICIAL_BODY_OPTIONS, BOOLEAN_OPTIONS, OPTIONS } from '../../consts/index';


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
    procedureCompleted: false
  });

  const title = "Nuevo Procedimiento";
  const subtitle = "Por favor, rellene los campos para crear un nuevo procedimiento.";

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const update = {
      [name]: type === 'checkbox' ? checked : (type === 'select-one' && (name === 'isGenderViolence' || name === 'isDomesticViolence') ? value === 'true' : value)
    };
    setProcedureData({ ...procedureData, ...update });
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
        procedureCompleted: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <FormPageLayout>
  <Flex direction={"column"} align={"center"} justify={"center"} width={"100%"} px={"10vw"} py={"20px"}>
    <Text textAlign={"center"} fontSize={"48px"} fontWeight={"bold"} mb={"4"}>
      {title}
    </Text>
    <Text textAlign={"center"} fontSize={"24px"} mb={"20px"}>
      {subtitle}
    </Text>
    <form onSubmit={onSubmit}>
      <VStack spacing={4}>
        <Flex wrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
          {OPTIONS.map((option) => {
            const isBoolean = option.includes("Violence") || option.includes("Completed");
            const isSelect = option === "judicialBody" || isBoolean;
            const isTextArea = option === "procedureReport";
            const isProcedureCompleted = option === "procedureCompleted";
            return (
              <Box key={option} p={2} mb={4} width={ 
                  isBoolean && !isProcedureCompleted ? "48%" : 
                  isProcedureCompleted ? "100%" : 
                  isTextArea ? "100%" : 
                  "100%"} 
                bg="gray.200" borderRadius="md">
                <Text fontSize={"16px"} mb={"2"}>
                  {option.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                {isSelect ? (
                  <select name={option} onChange={onChange} value={procedureData[option]}
                    style={{
                      width: '100%',
                      height: '50px',
                      fontWeight: 'medium',
                      fontSize: '16px',
                      borderRadius: '10px',
                      backgroundColor: 'green.200',
                      borderColor: 'blue.200'
                    }}>
                    {isBoolean ? BOOLEAN_OPTIONS.map(({ label, value }) => (
                      <option key={label} value={value}>{label}</option>
                    )) : JUDICIAL_BODY_OPTIONS.map(body => (
                      <option key={body} value={body}>{body}</option>
                    ))}
                  </select>
                ) : isTextArea ? (
                  <textarea name={option} onChange={onChange} value={procedureData[option]} placeholder={option.replace(/([A-Z])/g, ' $1').trim()}
                    style={{
                      width: '100%', 
                      height: '150px', 
                      fontWeight: 'medium',
                      fontSize: '16px',
                      borderRadius: '10px',
                      backgroundColor: 'white',
                      borderColor: 'gray.200'
                    }} />
                ) : (
                  <Input name={option} onChange={onChange} value={procedureData[option]} placeholder={option.replace(/([A-Z])/g, ' $1').trim()} bg="white" borderColor="gray.200" />
                )}
              </Box>
            );
          })}
        </Flex>
        <Box pt={4} marginBottom={"50px"}>
          <button type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '10px',
              fontWeight: 'medium',
              backgroundColor: 'blue',
              borderColor: 'blue',
              color: 'white'
            }}>Submit</button>
        </Box>
      </VStack>
    </form>
  </Flex>
</FormPageLayout>





  );
}

export default CreateProcedurePage;
