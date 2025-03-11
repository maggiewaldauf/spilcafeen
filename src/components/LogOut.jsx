import { signOut } from "firebase/auth";
import { auth} from "../firebase-config";
import { useNavigate } from "react-router-dom";

    export default function Logout() {
        const navigate = useNavigate();
    async function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/googlelogin/"); // Redirect to default page
        }).catch((error) => {
            // An error happened.
            alert("Error signing out: ", error);
        });
    }

    return (
        <p>
            <button type="button" onClick={logout}>Logout</button>
        </p>
    )

}