import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import Layout from "./Layout";

const router = createBrowserRouter([
    {
        path: "/spilcafeen/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "create",
                element: <CreatePage />,
            },
            {
                path: "posts/:postId",
                element: <UpdatePage />,
            },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;


