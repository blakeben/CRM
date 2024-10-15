import React, { useState } from "react";
import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [clientData, setClientData] = useState({
    Name: "",
    Email: "",
    Phone: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await fetchAuthSession();
      await axios.post(
        "https://iw30sqk3a0.execute-api.us-east-1.amazonaws.com/dev/clients",
        clientData,
        {
          headers: { Authorization: `Bearer ${session.tokens.accessToken}` },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding client:", error);
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
      <button type="submit">Add Client</button>
    </form>
  );
};

export default AddClient;
