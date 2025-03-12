import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    async function logout() {
        try {
            // Sign the user out from Firebase
            await signOut(auth);
            console.log("User logged out successfully!");

            // Redirect to the login page (or wherever you want the user to go after logout)
            navigate("/spilcafeen/");
        } catch (error) {
            // Handle error during logout
            console.error("Error signing out: ", error);
            alert("Error signing out: " + error.message);
        }
    }

    return (
        <p>
            <button className="logout-button" type="button" onClick={logout}>
                Logout
            </button>
        </p>
    );
}