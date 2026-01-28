import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { user, token } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("TEACH");

    const addSkill = async () => {
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
    };

    if (!user) return <h3>Please login</h3>;

    return (
        <div>
            <h2>Add Skill</h2>

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
