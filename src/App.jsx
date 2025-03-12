import React, { useState, useEffect } from 'react'; // Import React
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth functions
import { getDoc, doc } from "firebase/firestore"; // Firebase Firestore functions
import { auth, db } from "./firebase-config"; // Import Firebase auth and db
import AdminLogin from "./pages/AdminLogin";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Layout from "./Layout";

const App = () => {
  const [user, setUser] = useState(null); // State to track user login
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is an admin

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Set user if logged in
        const adminDoc = await getDoc(doc(db, "admins", user.uid)); // Check if user is admin
        if (adminDoc.exists()) {
          setIsAdmin(true); // User is an admin
        } else {
          setIsAdmin(false); // User is not an admin
        }
      } else {
        setUser(null); // User is not logged in
        setIsAdmin(false); // Reset admin status
      }
    });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  // Routes with protection for admin-only access
  const router = createBrowserRouter([
    {
      path: "/spilcafeen/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: user ? <HomePage /> : <AdminLogin />, // Redirect to login if not logged in
        },
        {
          path: "home",
          element: user ? <HomePage /> : <Navigate to="/spilcafeen/" />, // Show HomePage if logged in
        },
        {
          path: "create",
          element: user && isAdmin ? <CreatePage /> : <Navigate to="/spilcafeen/home" />, // Redirect if not admin
        },
        {
          path: "/spilcafeen/update/:postId",  
          element: user && isAdmin ? <UpdatePage /> : <Navigate to="/spilcafeen/home" />,
      }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
