import React, { useState } from 'react';
import FormPageLayout from '../../components/FormPageLayout/FormPageLayout';
import CustomForm from '../../components/CustomForm/CustomForm';
import { Flex, Text } from '@chakra-ui/layout';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import restaurantsService from '../../services/restaurants.service';

const IMAGE =
  'https://res.cloudinary.com/dagndlfhj/image/upload/v1709581221/matt-connor-9Qs_9n2oSJo-unsplash_izp5kl.jpg';

const OPTIONS = ['name', 'neighborhood', 'address', 'cuisine_type', 'image'];

const DAYS = ['Monday', 'Tuesday'];
function CreateRestaurantPage() {
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    neighborhood: '',
    address: '',
    cuisine_type: '',
    image: '',
    operating_hours: {},
  });

  const title = 'Create';
  const subtitle = 'Upload Your Restaurant';

  const onChange = (e) => {
    const { name, value } = e.target;
    let update = { [name]: value };
    if (DAYS.includes(name)) {
      update = {
        operating_hours: {
          ...restaurantData.operating_hours,
          [name]: value,
        },
      };
    }
    setRestaurantData({ ...restaurantData, ...update });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('create', restaurantData);
      await restaurantsService.creatRestaurant(restaurantData);
      setRestaurantData({
        name: '',
        neighborhood: '',
        address: '',
        cuisine_type: '',
        image: '',
        operating_hours: {
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormPageLayout backgroundImage={IMAGE}>
      <Flex minW={'400px'} maxW={'400px'} flexDir={'column'}>
        <Text textAlign={'center'} fontSize={'48px'} fontWeight={'bold'}>
          {title}
        </Text>
        {subtitle && (
          <Text textAlign={'center'} fontSize={'24px'}>
            {subtitle}
          </Text>
        )}
        <form onSubmit={onSubmit} style={{ marginTop: '30px' }}>
          <Flex flexDir={'column'} gap={'30px'}>
            {OPTIONS.concat(DAYS).map((option) => {
              if (DAYS.includes(option)) {
                console.log(restaurantData.operating_hours[option]);
              }
              return (
                <Input
                  name={option}
                  onChange={onChange}
                  key={option}
                  placeholder={option}
                  value={
                    DAYS.includes(option)
                      ? restaurantData.operating_hours[option] || ''
                      : restaurantData[option]
                  }
                />
              );
            })}
          </Flex>
          <SubmitButton />
        </form>
      </Flex>
    </FormPageLayout>
  );
}

export default CreateRestaurantPage;
