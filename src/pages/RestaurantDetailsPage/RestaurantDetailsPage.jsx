import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import restaurantsService from "../../services/restaurants.service"
import FormPageLayout from "../../components/FormPageLayout/FormPageLayout"
import RestaurantDetails from "../../components/RestaurantDetails/RestaurantDetails"
import { getRestaurantDetails } from "../../utils"
import Modal from "../../components/Modal/Modal"
import CustomForm from "../../components/CustomForm/CustomForm"
import {
  EDIT_RESTAURANT_DATA,
  RESTAURANT_MOCK,
  RESTAURANT_OPTIONS,
} from "../../consts"

const RestaurantDetailsPage = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [showModal, setShowModal] = useState(false)
  const [restaurant, setRestaurant] = useState(RESTAURANT_MOCK)
  const [editRestaurantData, setEditRestaurantData] =
    useState(EDIT_RESTAURANT_DATA)
  const { id } = useParams()
  const {
    image,
    name,
    neighborhood,
    address,
    cuisine_type,
    operating_hours,
    location,
    reviews,
  } = restaurant
  const RESTAURANT_DETAILS = getRestaurantDetails(
    name,
    neighborhood,
    address,
    cuisine_type,
    operating_hours,
    location,
    reviews
  )

  const getSingleRestaurant = async () => {
    try {
      const singleRestaurant = await restaurantsService.getOneRestaurant(id)
      setRestaurant(singleRestaurant)
    } catch (error) {
      console.log("Error ==>", error)
    }
  }

  useEffect(() => {
    getSingleRestaurant()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log("EL NAME Y EL VALUE ==>", name, value)
    setEditRestaurantData({ ...editRestaurantData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedRestaurant = await restaurantsService.editRestaurant(
      id,
      editRestaurantData
    )
    setShowModal(false)
    setRestaurant(updatedRestaurant)
    try {
    } catch (error) {
      // MOSTRAR EL ERROR => MODAL!!! TE FALTA EL NOMBRE DE USUARIO: HACKER JIJIJI
      console.log("ERROR ==>", error)
    }
  }

  return (
    <FormPageLayout backgroundImage={image}>
      <RestaurantDetails
        onOpen={() => setShowModal(true)}
        restaurantDetails={RESTAURANT_DETAILS}
      />
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <CustomForm
            options={RESTAURANT_OPTIONS}
            onChange={handleChange}
            onSubmit={handleSubmit}
            title={"Edit Restaurant!"}
          />
        </Modal>
      )}
    </FormPageLayout>
  )
}

export default RestaurantDetailsPage
