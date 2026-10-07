import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">List</Link>
      <Link to="/gallery">Gallery</Link>
    </nav>
  )
}

export default Navbar