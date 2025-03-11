import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";

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
        </nav>
    );
}
