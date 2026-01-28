import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div style={{ padding: "10px", background: "#eee" }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link>
        </div>
    );
}

export default NavBar;
