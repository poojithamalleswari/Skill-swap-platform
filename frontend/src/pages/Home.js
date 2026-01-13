import { useState } from "react";

function Home() {
    const [skills, setSkills] = useState([
        "C++",
        "React",
        "UI Design"
    ]);

    return (
        <div>
            <h2>Available Skills</h2>
            {skills.map((skill, index) => (
                <div key={index}>{skill}</div>
            ))}
        </div>
    );
}

export default Home;
