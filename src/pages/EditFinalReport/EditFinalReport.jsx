import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Textarea, Flex, Switch } from '@chakra-ui/react';
import finalreportService from '../../services/finalReport.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import authService from '../../services/auth.service';

function EditFinalReport() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [finalReport, setFinalReport] = useState({
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    location: '',
    observations: '',
    procedureReport: '',
    pathologyCompleted: false,
    judicialBody: '',
    guardValidate: false,
    pathologyValidate: false,
    finalReportCompleted: false,
    finalReport: '',
    guardInfo: {},
    pathologyInfo: {},
  });

  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchFinalReport = async () => {
      try {
        const loadedFinalReport = await finalreportService.getFinalReportById(id);
        setFinalReport(loadedFinalReport);
      } catch (error) {
        console.error('Error loading the Final Report:', error);
        navigate('/finalReport');
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authService.getUser(token);
          setUserInfo({
            userId: user._id,
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

    fetchFinalReport();
    fetchUserData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'finalReport') {
      setFinalReport(prevFinalReport => ({
        ...prevFinalReport,
        guardValidate: false,
        pathologyValidate: false,
        [name]: value,
      }));
    } else {
      setFinalReport(prevFinalReport => ({
        ...prevFinalReport,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSwitchChange = (field) => {
    if (field === 'finalReportCompleted') {
      if (!finalReport.guardValidate || !finalReport.pathologyValidate) {
        console.error("No se puede completar el informe final hasta que se validen guardia y patología.");
        return;
      }
    }
    if (field === 'guardValidate' && finalReport.guardInfo.guardId !== userInfo.userId) {
      console.error("No tienes permiso para cambiar la validación de guardia.");
      return;
    }
    if (field === 'pathologyValidate' && finalReport.pathologyInfo.pathologyId !== userInfo.userId) {
      console.error("No tienes permiso para cambiar la validación de patología.");
      return;
    }
    setFinalReport(prevFinalReport => ({
      ...prevFinalReport,
      [field]: !prevFinalReport[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await finalreportService.updateFinalReport(id, finalReport);
      navigate('/finalReport');
    } catch (error) {
      console.error('Error updating the final report:', error);
    }
  };

  return (
    <PageWrapper>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            
            <FormControl>
              <FormLabel>Informe Final</FormLabel>
              <Textarea name="finalReport" value={finalReport.finalReport} onChange={handleChange} />
            </FormControl>
           
            <FormControl>
              <FormLabel htmlFor="guardValidate">Validación de Guardia</FormLabel>
              <Switch id="guardValidate" isChecked={finalReport.guardValidate} onChange={() => handleSwitchChange('guardValidate')} />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="pathologyValidate">Validación de Patología</FormLabel>
              <Switch id="pathologyValidate" isChecked={finalReport.pathologyValidate} onChange={() => handleSwitchChange('pathologyValidate')} />
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="finalReportCompleted">Informe Final Completado</FormLabel>
              <Switch id="finalReportCompleted" isChecked={finalReport.finalReportCompleted} onChange={() => handleSwitchChange('finalReportCompleted')} />
            </FormControl>
            
            <Button type="submit" colorScheme="blue">
              Actualizar
            </Button>
          </Flex>
        </form>
      </Box>
    </PageWrapper>
  );
}

export default EditFinalReport;