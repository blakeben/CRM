import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";

const EditClient = () => {
  const { clientId } = useParams();
  const [clientData, setClientData] = useState({
    Name: "",
    Email: "",
    Phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const session = await fetchAuthSession();

        const response = await axios.get(
          `https://[ID_PLACEHOLDER].execute-api.us-east-1.amazonaws.com/dev/clients/${clientId}`,
          {
            headers: { Authorization: `Bearer ${session.tokens.accessToken}` },
          }
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
        navigate("/");
      }
    };
    fetchClient();
  }, [clientId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await fetchAuthSession();
      await axios.put(
        `https://iw30sqk3a0.execute-api.us-east-1.amazonaws.com/dev/clients/${clientId}`,
        clientData,
        {
          headers: { Authorization: `Bearer ${session.tokens.accessToken}` },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={clientData.Name}
        onChange={(e) => setClientData({ ...clientData, Name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={clientData.Email}
        onChange={(e) =>
          setClientData({ ...clientData, Email: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={clientData.Phone}
        onChange={(e) =>
          setClientData({ ...clientData, Phone: e.target.value })
        }
        required
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditClient;
