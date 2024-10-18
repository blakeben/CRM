import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { Link, useNavigate } from "react-router-dom";
import { Hub } from "aws-amplify/utils";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const session = await fetchAuthSession();

        const response = await axios.get(
          "https://[ID_PLACEHOLDER].execute-api.us-east-1.amazonaws.com/dev/clients",
          {
            headers: {
              Authorization: `Bearer ${session.tokens.accessToken}`,
            },
          }
        );

        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        if (error.response?.status === 401) {
          navigate("/auth");
        }
      }
    };

    Hub.listen("auth", fetchClients);
    fetchClients();
    return () => Hub.remove("auth", fetchClients);
  }, [navigate]);

  const handleDelete = async (clientId) => {
    try {
      const session = await fetchAuthSession();

      await axios.delete(
        `https://[ID_PLACEHOLDER].execute-api.us-east-1.amazonaws.com/dev/clients/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${session.tokens.accessToken}`,
          },
        }
      );

      setClients(clients.filter((client) => client.ClientID !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div>
      <h1>Client List</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.ClientID}>
            {client.Name} ({client.Email})
            <Link to={`/edit-client/${client.ClientID}`}>Edit</Link>
            <button onClick={() => handleDelete(client.ClientID)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="/add-client">Add New Client</Link>
    </div>
  );
};

export default Dashboard;
