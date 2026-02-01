import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Admin() {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api
            .get("/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUsers(res.data));
    }, []);

    return (
        <div>
            <h2>Admin Panel</h2>

            {users.map((u) => (
                <div key={u.id}>
                    {u.email} ({u.role})
                    <button
                        onClick={() =>
                            api.put(
                                `/admin/ban/${u.id}`,
                                {},
                                { headers: { Authorization: `Bearer ${token}` } }
                            )
                        }
                    >
                        Ban
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Admin;
