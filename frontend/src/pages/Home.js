import { useEffect, useState } from "react";
import api from "../api";

function Home() {
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSkills = async () => {
        try {
            setLoading(true);
            const res = await api.get(
                `/skills?search=${search}&type=${type}`
            );
            setSkills(res.data);
            setError("");
        } catch {
            setError("Failed to load skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div>
            <h2>Skill Marketplace</h2>

            <input
                placeholder="Search skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">All</option>
                <option value="TEACH">Teach</option>
                <option value="LEARN">Learn</option>
            </select>

            <button onClick={fetchSkills}>Search</button>

            <hr />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {skills.length === 0 && !loading && <p>No skills found</p>}
            {skills.map((skill) => (
                <div key={skill.id}>
                    <strong>{skill.title}</strong> ({skill.type})
                    <br />
                    Posted by: {skill.email}
                </div>
            ))}
        </div>
    );
}

export default Home;
