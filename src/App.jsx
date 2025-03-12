import React from 'react';  // Make sure React is imported
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Layout from "./Layout";

// Custom wrapper for protected routes
const ProtectedRoute = ({ element, adminOnly }) => {
  const user = localStorage.getItem('user'); // Store the logged-in user in localStorage
  const [isAdmin, setIsAdmin] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      const checkAdminStatus = async () => {
        // Check admin status using Firebase Firestore logic
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        setIsAdmin(adminDoc.exists());
      };
      checkAdminStatus();
    }
  }, [user]);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Show loading while checking
  }

  if (adminOnly && !isAdmin) {
    // Redirect to login if not an admin
    return <Redirect to="/spilcafeen/" />;
  }

  return element; // Show the requested page if the check passes
};

const router = createBrowserRouter([
  {
    path: "/spilcafeen/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminLogin />, // Default route - AdminLogin page
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "create",
        element: (
          <ProtectedRoute element={<CreatePage />} adminOnly={true} />
        ), // Protect CreatePage
      },
      {
        path: "posts/:postId",
        element: <UpdatePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
