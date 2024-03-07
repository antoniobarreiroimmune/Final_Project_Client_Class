import restaurantsService from '../../services/restaurants.service';

const LoaderRestaunrantsPage = async () => {
  const restaurants = await restaurantsService.getAllRestaurants();

  return restaurants;
};

export default LoaderRestaunrantsPage;
