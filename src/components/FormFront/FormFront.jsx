import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CustomForm from '../CustomForm/CustomForm';
import FormPageLayout from '../FormPageLayout/FormPageLayout';


const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      console.error('Error during the login process:', error);
    }
  };

  return (
    <FormPageLayout>
      
    <CustomForm
      title="Login"
      subtitle="Inicie sesión en su cuenta"
      onChange={handleChange}
      onSubmit={handleSubmit}
      options={[
        { name: 'email', type: 'email' },
        { name: 'password', type: 'password' }
      ]}
    />

    </FormPageLayout>
  );
};

export default LoginForm;
