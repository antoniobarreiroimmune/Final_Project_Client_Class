import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const ProfilePage = () => {
  const { user } = useContext(AuthContext); 

 
  if (!user) {
    return <div>Loading user data...</div>; 
  }
  

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>User Details:</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
       <p><strong>Departamento</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
