import User from "./User";

export default function UsersList({users, loading}) {
  return !loading 
    ? 
      (
      <div>
        <h1 style={{marginLeft: '35px'}}>Users</h1>
        <div className="usersListContainer">
          {
            users.map((user, index) => <User user={user} key={index}/>)
          }
        </div>
      </div>
      )
    : 
      <div className="spinnerContainer"><div className="spinner"></div></div>
}