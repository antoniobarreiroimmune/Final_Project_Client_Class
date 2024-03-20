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
    judicialBody: 'Primera Instancia n1 A Coruña',
    procedureReport: "",
    procedureCompleted: false
  });

  const title = "Create Procedure";
  const subtitle = "Register New Procedure";

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
        judicialBody: 'Primera Instancia n1 A Coruña',
        procedureReport: "",
        procedureCompleted: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormPageLayout>
      <Flex direction={"column"} align={"center"} justify={"center"} minW={"400px"} maxW={"800px"} mb={"100px"}> 
        <Text textAlign={"center"} fontSize={"48px"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text textAlign={"center"} fontSize={"24px"} mb={"20px"}>
          {subtitle}
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={4}>
            <Flex wrap={"wrap"} justifyContent={"space-between"}>
              {OPTIONS.map((option) => {
                const isBoolean = option.includes("Violence") || option.includes("Completed");
                const isSelect = option === "judicialBody" || isBoolean;
                return (
                  <Box key={option} p={2} minWidth={isBoolean ? "full" : "45%"}>
                    <Text fontSize={"16px"}>{option.replace(/([A-Z])/g, ' $1').trim()}</Text>
                    {isSelect ? (
                      <select name={option} onChange={onChange} value={procedureData[option]}
                        style={{
                          width: '100%', 
                          height: '70px',
                          fontWeight: 'medium',
                          fontSize: '20px',
                          borderRadius: '15px',
                          backgroundColor: '#E8F0FE',
                          borderColor: '#E8F0FE',
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                          padding: '0 15px'
                        }}>
                        {isBoolean ? BOOLEAN_OPTIONS.map(({ label, value }) => (
                          <option key={label} value={value}>{label}</option>
                        )) : JUDICIAL_BODY_OPTIONS.map(body => (
                          <option key={body} value={body}>{body}</option>
                        ))}
                      </select>
                    ) : (
                      <Input name={option} onChange={onChange} value={procedureData[option]} placeholder={option.replace(/([A-Z])/g, ' $1').trim()} />
                    )}
                  </Box>
                );
              })}
            </Flex>
            <Box pt={4}>
              <button type="submit"
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderRadius: '15px',
                  fontWeight: 'medium',
                  backgroundColor: '#E8F0FE',
                  borderColor: '#E8F0FE',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                }}>Submit</button>
            </Box>
          </VStack>
        </form>
      </Flex>
    </FormPageLayout>
  );
}

export default CreateProcedurePage;
