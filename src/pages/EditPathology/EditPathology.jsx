import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Switch, Textarea } from '@chakra-ui/react';
import pathologyService from '../../services/pathology.service';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { UserContext } from '../../contexts/UserContext';
import authService from '../../services/auth.service';




function EditPathology() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [pathology, setPathology] = useState({
    name: '',
    firstName: '',
    lastName: '',
    dni: '',
    address: '',
    location: { type: '', coordinates: [] },
    observations: '',
    procedureReport: '',
    pathologyCompleted: false,
    judicialBody: '',
    pathologyInfo: {},
    isGenderViolence: false,
    isDomesticViolence: false,
  });

  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchPathology = async () => {
      try {
        let loadedPathology = null;
        if (!location.state?.pathology) {
          loadedPathology = await pathologyService.getPathologyById(id);
        } else {
          loadedPathology = location.state.pathology;
        }
        setPathology(loadedPathology);
      } catch (error) {
        console.error('Error loading the pathology:', error);
        navigate('/Pathology');
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

    fetchPathology();
    fetchUserData();
  }, [id, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPathology(prevPathology => ({
      ...prevPathology,
      [name]: value
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPathology = {
        ...pathology,
        pathologyInfo: {
          pathologyId: userInfo.userId,
          name: userInfo.name,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email
        }
      };
      await pathologyService.updatePathology(id, updatedPathology);
      navigate('/Pathology');
    } catch (error) {
      console.error('Error updating the pathology:', error);
    }
  };

  return (
    <PageWrapper>
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <FormControl>
            <FormLabel>Informe de Patología</FormLabel>
            <Textarea
              id="pathologyReport"
              name="pathologyReport"
              value={pathology.pathologyReport}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="pathologyCompleted" mb="0">
              Informe de Patología Completado
            </FormLabel>
            <Switch
              id="pathologyCompleted"
              colorScheme={pathology.pathologyCompleted ? 'green' : 'red'}
              isChecked={pathology.pathologyCompleted}
              onChange={() => setPathology(prev => ({ ...prev, pathologyCompleted: !prev.pathologyCompleted }))}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Actualizar Procedimiento
          </Button>
        </Flex>
      </form>
    </Box>
  </PageWrapper>
  );
}

export default EditPathology;

