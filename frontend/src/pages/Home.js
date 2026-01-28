import { useEffect, useState } from "react";
import api from "../api";

function Home() {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get("/skills").then((res) => setSkills(res.data));
    }, []);

    return (
        <div>
            <h2>Skill Marketplace</h2>

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
