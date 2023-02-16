import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterForm from './pages/RegisterForm';
import UsersList from './pages/UsersList';
import { getAllUsers } from './firebase/firebase';
import logo from './logo.svg';
import NotFound from './pages/NotFound';

function App() {
  const [users, setUsers] = useState([])
  const [allUsersLoading, setAllUsersLoading] = useState(true)

  useEffect(() => {
    getAllUsers().then((newUsers) => {
      setUsers(newUsers)
      setAllUsersLoading(false)
    })
  }, [])
  const addSingleUserToState =(user) => setUsers([...users, user])
  return (
    <div className="App">
      <Navbar />
      <div style={{paddingTop: '55px'}}>
      <Routes>
        <Route path='/' element={<Navigate to="/register"/>}/>
        <Route path="/register" element={<RegisterForm addSingleUserToState={addSingleUserToState} />}/>
        <Route path="/users" element={<UsersList loading={allUsersLoading} users={users}/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </div>
      
    </div>
  );
}

export default App;
