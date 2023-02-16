import { Avatar } from "@mui/material";

export default function User({user}) {
  return (
    <div className='userContainer'>
      <div className="avatarWrapper">
        <img src={user.avatar} className="avatar" alt='avatar' />
      </div>
        
      <div>
        <p>Name: {user.name}</p>
        <p>Surname: {user.surname}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Birth Date: {user.birthDate}</p>
      </div>
    </div>
  )
}