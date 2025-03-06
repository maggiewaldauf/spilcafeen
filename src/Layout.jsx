import { Outlet } from "react-router-dom";
import Nav from "./components/nav";

function Layout() {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;