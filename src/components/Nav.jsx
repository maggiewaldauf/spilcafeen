import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <Link to="">Posts</Link>
            <Link to="create">Create</Link>
        </nav>
    );
}
