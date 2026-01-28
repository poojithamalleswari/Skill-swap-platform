import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={{ padding: "10px", background: "#eee" }}>
            <Link to="/">Home</Link> |{" "}

            {!user ? (
                <>
                    <Link to="/login">Login</Link> |{" "}
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard">Dashboard</Link> |{" "}
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </div>
    );
}

export default NavBar;
