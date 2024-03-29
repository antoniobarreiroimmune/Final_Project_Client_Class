import React, { useState, useEffect } from "react";
import { Flex, Button, Box, IconButton } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { FormInput, FormSwitch, FormSelect } from '../../components/FormControls/FormControls';
import proceduresService from "../../services/procedures.service";
import authService from "../../services/auth.service";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { JUDICIAL_BODY_OPTIONS } from '../../consts';
import { MdGpsFixed } from 'react-icons/md';

function CreateProcedurePage() {
  const [procedureData, setProcedureData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    dni: "",
    location: "",
    address: "",
    observations: "",
    isGenderViolence: false,
    isDomesticViolence: false,
    judicialBody: '',
    procedureReport: "",
  });
  const [userInfo, setUserInfo] = useState({
    guardId: null,
    name: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getUser(token);
          setUserInfo({
            guardId: user._id,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });
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

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setProcedureData(prevState => ({
            ...prevState,
            location: {
              type: "Point",
              coordinates: [longitude, latitude]
            }
          }));
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
        }
      );
    } else {
      alert("La geolocalización no está soportada por este navegador.");
    }
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const procedureDataWithUserInfo = {
      ...procedureData,
      guardInfo: {
        guardId: userInfo.guardId,
        name: userInfo.name,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      },
    };
    try {
      await proceduresService.createProcedure(procedureDataWithUserInfo);
      navigate('/guardhome');
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
              <FormInput label="Nombre" value={procedureData.name} onChange={onChange} name="name" mb={{ base: '8', sm: '2' }} />
              <FormInput label="Primer Apellido" value={procedureData.firstName} onChange={onChange} name="firstName" />
              <FormInput label="Segundo Apellido" value={procedureData.lastName} onChange={onChange} name="lastName" />
            </Flex>
            <Flex direction="row" gap="2">
              <FormInput label="DNI" value={procedureData.dni} onChange={onChange} name="dni" />
              <FormSelect label="Cuerpo Judicial" value={procedureData.judicialBody} onChange={onChange} name="judicialBody" options={JUDICIAL_BODY_OPTIONS} />

            </Flex>
            <Flex direction="row" gap="2">
              <FormInput label="Dirección" value={procedureData.address} onChange={onChange} name="address" />

              <FormInput
                label="Localización"
                value={procedureData.location ? `Lat: ${procedureData.location.coordinates[1]}, Lon: ${procedureData.location.coordinates[0]}` : ''}
                onChange={onChange}
                name="location"
                readOnly
                placeholder="Haga clic en el icono para geolocalizar"
                rightElement={
                  <IconButton
                    size="sm"
                    aria-label="Geolocalizar"
                    icon={<MdGpsFixed />}
                    onClick={getDeviceLocation}
                    variant="ghost"
                  />
                }
              />


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
