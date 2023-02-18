import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/register" >Register</Link>
      <Link to="/users">Users List</Link>
    </nav>
  )
}