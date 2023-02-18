import User from "../components/User";

//list registered users
export default function UsersList({users, loading}) {
  return !loading 
    ? 
      (
      <div>
        <h1 style={{marginLeft: '35px'}}>Users</h1>
        <div className="usersListContainer">
        {
            users.sort((a,b) => {
              if (!a.timestamp && !b.timestamp) return 0
              if (a.timestamp && !b.timestamp) return 1
              if (!a.timestamp && b.timestamp) return -1
              if (a.timestamp > b.timestamp) {
                return 1
              } else {
                return -1
              }
            }).slice(0).reverse().map((user, index) => <User user={user} key={index}/>)
          }
        </div>
      </div>
      )
    : 
      <div className="spinnerContainer"><div className="spinner"></div></div>
}