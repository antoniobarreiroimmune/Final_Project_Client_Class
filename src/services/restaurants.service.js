import AxiosConfig from "./axios"

class RestaurantService extends AxiosConfig {
  constructor() {
    super("restaurants")
  }

  async getAllRestaurants() {
    const response = await this.axios.get("/list")
    return response.data
  }

  async getOneRestaurant(id) {
    const response = await this.axios.get(`/getOne/${id}`)
    return response.data
  }

  async creatRestaurant(data) {
    data.location = {
      type: "Point",
      coordinates: [12, -43],
    }
    const response = await this.axios.post("/create", data)
    return response.data
  }

  async editRestaurant(id, data) {
    const response = await this.axios.put(`/edit/${id}`, data)
    return response.data
  }
}

export default new RestaurantService()
