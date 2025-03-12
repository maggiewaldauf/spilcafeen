import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import Logout from "../components/LogOut"; // Assuming you have the Logout component

export default function Nav() {
    return (
        <nav>
            {/* Logo */}
            <img src={logo} alt="Logo" className="logo" />

            {/* Navigation Links */}
            <div className="nav-links">
                <Link to="" className="nav-link">Posts</Link>
                <Link to="create" className="nav-link">Create</Link>
            </div>

            {/* Logout Button on the right */}
            <div className="logout-container">
                <Logout /> {/* Logout Component */}
            </div>
        </nav>
    );
}