import React, { useEffect, useState } from "react"
import FormPageLayout from "../../components/FormPageLayout/FormPageLayout"
import CustomForm from "../../components/CustomForm/CustomForm"
import authService from "../../services/auth.service"
import { useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const SignupPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const toast = useToast()
  const navigate = useNavigate()

  const BACKGROUND_IMAGE =
    "https://res.cloudinary.com/dagndlfhj/image/upload/v1709581221/matt-connor-9Qs_9n2oSJo-unsplash_izp5kl.jpg"

  const onChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.signup(userData)
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      navigate("/login")
    } catch (error) {
      console.log("Error ==>", error)
    }
  }

  return (
    <FormPageLayout backgroundImage={BACKGROUND_IMAGE}>
      <CustomForm
        marginBottom={"80px"}
        title={"Signup"}
        subtitle={"Let’s start cooking!:"}
        onChange={onChange}
        onSubmit={onSubmit}
        options={["username", "email", "password"]}
      />
    </FormPageLayout>
  )
}

export default SignupPage
