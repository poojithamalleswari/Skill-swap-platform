import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";

function Dashboard() {
    const { user, token } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("TEACH");

    if (!user || !token) {
        return <h3>Please login to access dashboard</h3>;
    }

    const addSkill = async () => {
        try {
            await api.post(
                "/skills",
                { title, type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Skill added");
            setTitle("");
        } catch (err) {
            alert("Failed to add skill");
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user.email}</p>

            <h3>Add Skill</h3>

            <input
                placeholder="Skill title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="TEACH">Teach</option>
                <option value="LEARN">Learn</option>
            </select>

            <button onClick={addSkill}>Add</button>
        </div>
    );
}

export default Dashboard;
