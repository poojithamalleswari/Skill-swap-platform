import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { user, token } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch incoming requests
    const fetchRequests = () => {
        api
            .get("/swaps/incoming", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setRequests(res.data))
            .catch(() => setMessage("Failed to load requests"));
    };

    useEffect(() => {
        if (token) fetchRequests();
    }, [token]);

    // Update status
    const updateStatus = async (id, status) => {
        try {
            await api.put(
                `/swaps/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchRequests(); // refresh
        } catch (err) {
            alert("Failed to update request");
        }
    };

    if (!user) return <h3>Please login to view dashboard</h3>;

    return (
        <div>
            <h2>Dashboard</h2>

            {message && <p style={{ color: "red" }}>{message}</p>}

            <h3>Incoming Swap Requests</h3>

            {requests.length === 0 && <p>No incoming requests</p>}

            {requests.map((req) => (
                <div
                    key={req.id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <p>
                        <strong>{req.requester}</strong> requested your skill{" "}
                        <strong>{req.title}</strong>
                    </p>
                    <p>
                        Status:{" "}
                        <span style={{
                            color: req.status === "ACCEPTED" ? "green" :
                                req.status === "REJECTED" ? "red" : "orange"
                        }}>
                            {req.status}
                        </span>
                    </p>

                    {req.status === "PENDING" && (
                        <>
                            <button
                                onClick={() => updateStatus(req.id, "ACCEPTED")}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => updateStatus(req.id, "REJECTED")}
                                style={{ marginLeft: "10px" }}
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
