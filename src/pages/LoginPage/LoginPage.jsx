import FormPageLayout from "../../components/FormPageLayout/FormPageLayout"
import CustomForm from "../../components/CustomForm/CustomForm"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const LoginPage = () => {
  const { login } = useContext(AuthContext)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const BACKGROUND_IMAGE =
    "https://res.cloudinary.com/dagndlfhj/image/upload/v1709581290/thu-nguyen-rDe6SRMZyqE-unsplash_l2rntm.jpg"

  const onChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await login(userData)
  }

  return (
    <FormPageLayout backgroundImage={BACKGROUND_IMAGE}>
      <CustomForm
        marginBottom={"80px"}
        title={"Login"}
        subtitle={"Let’s start cooking!:"}
        onChange={onChange}
        onSubmit={onSubmit}
        options={["email", "password"]}
      />
    </FormPageLayout>
  )
}

export default LoginPage
