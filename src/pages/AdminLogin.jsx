import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase-config";

export default function AdminLogin() {
  const navigate = useNavigate();

  // Function to handle Google login
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        console.log("User display name:", result.user.displayName);
        console.log("User email:", result.user.email);

        // After successful login, check if the user is an admin
        const user = result.user;
        const checkAdmin = async () => {
          const adminDoc = await getDoc(doc(db, "admins", user.uid));
          console.log("Checking admin document for UID:", user.uid);
          
          if (adminDoc.exists()) {
            console.log("Admin document found:", adminDoc.data());
            // Store the user info in localStorage (or consider using state)
            localStorage.setItem("user", JSON.stringify(result.user)); // Store user in localStorage
            
            // If the user is an admin, redirect to HomePage
            console.log("User is an admin");
            navigate("/spilcafeen/home");
          } else {
            console.log("No admin document found for UID:", user.uid);
            // If the user is not an admin, show a message
            alert("You are not an admin!");
          }
        };
        checkAdmin();
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("You have not signed in: " + error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Authenticated user UID:", uid);

        const checkAdminStatus = async () => {
          const adminDoc = await getDoc(doc(db, "admins", uid));
          if (adminDoc.exists()) {
            console.log("User is an admin");
            navigate("/spilcafeen/home");
          } else {
            console.log("No admin document found for UID:", uid);
            alert("You are not an admin!");
          }
        };
        checkAdminStatus();
      }
    });
  }, [navigate]);

  return (
    <div className="container">
      <h1>Admin Login</h1>
      <button type="button" className="login-button" onClick={signInWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}
