import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <h3>Please login to view dashboard</h3>;
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user.email}</p>
        </div>
    );
}

export default Dashboard;
