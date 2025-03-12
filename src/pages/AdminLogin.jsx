import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase-config";
import Logout from "../components/LogOut";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Function to handle Google login
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName);
        console.log(result.user.email);
        // After successful login, check if the user is an admin
        const user = result.user;
        const checkAdmin = async () => {
          const adminDoc = await getDoc(doc(db, "admins", user.uid));
          if (adminDoc.exists()) {
            // If the user is an admin, log a message or take any action for admins
            console.log("User is an admin");
            // Redirect to HomePage after verifying admin
            navigate("/spilcafeen/home");
          } else {
            // If the user is not an admin, show a message or handle it
            alert("You are not an admin!");
          }
        };
        checkAdmin();
      })
      .catch((error) => {
        alert("You have not signed in: " + error);
      });
  };

  // Checking if a user is logged in or not (on page load)
  useEffect(() => {
    const checkAdminStatus = async (user) => {
      if (user) {
        const uid = user.uid;
        const adminDoc = await getDoc(doc(db, "admins", uid));
        if (adminDoc.exists()) {
          console.log("User is an admin");
          // Redirect to HomePage after checking status
          navigate("/spilcafeen/home");
        } else {
          // Handle if user is not an admin
          alert("You are not an admin!");
        }
      }
    };

    onAuthStateChanged(auth, (user) => {
      checkAdminStatus(user); // Check if the user is authenticated
    });
  }, [navigate]);

  return (
    <div className="container">
      <h1>Admin Login</h1>
      <button type="button" className="login-button" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <Logout /> {/* Assuming Logout component is used to sign out */}
    </div>
  );
}